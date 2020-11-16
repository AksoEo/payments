import handlebars from 'handlebars';
import expressHbs from 'express-handlebars';
import { stdlib } from '@tejo/akso-script';
import express from 'express';
import Markdown from 'markdown-it';
import moment from 'moment';
import path from 'path';
import url from 'url';
import fs from 'fs';

import { initAPI, fetchIntent, markSubmitted, cancelIntent } from './intent.js';
import locale from '../locale.js';

moment.locale('eo');

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// TODO: POST param for redirecting back or sth

// reads process.env and any .env file
function readEnv() {
    let contents = {};
    try {
        contents = Object.fromEntries(fs.readFileSync('.env', 'utf-8')
            .split('\n')
            .map(line => {
                const s = line.indexOf('=');
                return [line.substr(0, s), line.substr(s + 1)];
            })
            .filter(([a, b]) => a && b));
    } catch {}
    return { ...contents, ...process.env };
}
const env = readEnv();

const config = {
    port: +env['AKSO_PORT'] || 7246,
    api: env['AKSO_API'] || 'https://api.akso.org',
    apiKey: env['AKSO_API_KEY'],
    apiSecret: env['AKSO_API_SECRET'],
};

if (!config.apiKey || !config.apiSecret) {
    console.error('API key and API secret are missing! To set values, use AKSO_API_KEY and AKSO_API_SECRET in env.');
    process.exit(1);
}

initAPI(config.api, config.apiKey, config.apiSecret);

// Inheritance in Handlebars
// from https://gist.github.com/Wilfred/715ae4e22642cfff1dbd
handlebars.loadPartial = name => {
    let partial = handlebars.partials[name];
    if (typeof partial === 'string') {
        partial = handlebars.compile(partial);
        handlebars.partials[name] = partial;
    }
    return partial;
};
handlebars.registerHelper('block', (name, opts) => {
    const partial = handlebars.loadPartial(name) || opts.fn;
    return partial(this, { data: opts.hash });
});
handlebars.registerHelper('partial', (name, opts) => {
    handlebars.registerPartial(name, opts.fn);
});

// more helpers
handlebars.registerHelper('equals', (a, b) => {
    return a === b;
});
handlebars.registerHelper('renderMarkdown', contents => {
    if (!contents) return '';
    // TODO: handle rules
    return new Markdown().render(contents);
});
handlebars.registerHelper('renderCurrency', (currency, amount) => {
    return stdlib.currency_fmt.apply(null, [currency, amount]);
});
handlebars.registerHelper('renderValidity', (intent) => {
    const validity = intent.paymentMethod.paymentValidity;
    if (!validity) return '';

    const expiryDate = moment((intent.timeCreated + validity) * 1000);

    const timeLeft = expiryDate.fromNow();

    return timeLeft;
});

const app = express();
app.engine('hbs', expressHbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

async function renderBadRequest(res) {
    res.status(400).render('error', {
        locale,
        errorText: locale.errors.badRequest,
    });
}

async function renderNotFound(res) {
    res.status(404).render('error', {
        locale,
        errorText: locale.errors.notFound,
    });
}

async function renderInternalServerError(res) {
    res.status(500).render('error', {
        locale,
        errorText: locale.errors.internalServerError,
    });
}

// intent statuses for which the page exists
const ALLOWED_STATUSES = ['pending', 'processing', 'submitted'];

async function renderIntentPage(intentId, res, options = {}) {
    let intent = null;
    try {
        intent = await fetchIntent(intentId);
    } catch (err) {
        if (err.statusCode !== 404) {
            console.error('Failed to fetch intent' + intentId, err);

            return await renderInternalServerError(res);
        }
    }

    if (intent === null || (!options.allowAllStatuses && !ALLOWED_STATUSES.includes(intent.status))) {
        return await renderNotFound(res);
    }

    let style = 'akso';
    if (intent.org === 'uea') style = 'uea';
    else if (intent.org === 'tejo') style = 'tejo';

    res.render('index', {
        pageTitle: locale.order.pageTitle[style],
        locale,
        style,
        useStripe: !!intent.stripePaymentIntentId,
        intent,
        options,
        stripePk: intent.paymentMethod.stripePublishableKey,
    });
}

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    res.redirect(301, 'https://akso.org');
});

app.get('/i/:intent', async (req, res) => {
    let ret = null;
    if (typeof req.query.return === 'string') ret = req.query.return;
    await renderIntentPage(req.params.intent, res, { return: ret });
});
app.post('/i/:intent', async (req, res) => {
    const intentId = req.params.intent;

    if (typeof req.body !== 'object' || typeof req.body.type !== 'string') return await renderBadRequest(res);
    if (req.body.type === 'view') {
        return await renderIntentPage(intentId, res, {
            return: req.body.return,
        });
    } else if (req.body.type === 'submit') {
        const error = await markSubmitted(intentId);
        if (error === 'illegal-state') {
            return await renderIntentPage(intentId, res, {
                error: locale.messages.submitIllegalState,
                return: req.body.return,
            });
        } else if (error) {
            console.error('Failed to submit intent ' + intentId, error);;
            return await renderIntentPage(intentId, res, {
                error: locale.messages.submitInternalServerError,
                return: req.body.return,
            });
        }

        return await renderIntentPage(intentId, res, {
            message: locale.messages.submitSucceeded,
            return: req.body.return,
        });
    } else if (req.body.type === 'precancel') {
        return await renderIntentPage(intentId, res, {
            cancel: true,
            return: req.body.return,
        });
    } else if (req.body.type === 'cancel') {
        const error = await cancelIntent(intentId);
        if (error === 'illegal-state') {
            return await renderIntentPage(intentId, res, {
                error: locale.messages.cancelIllegalState,
                return: req.body.return,
            });
        } else if (error) {
            console.error('Failed to cancel intent ' + intentId, error);
            return await renderIntentPage(intentId, res, {
                error: locale.messages.cancelInternalServerError,
                return: req.body.return,
            });
        }
        return await renderIntentPage(intentId, res, {
            allowAllStatuses: true, // intent is canceled, but we still want to render it
            canceled: true,
            return: req.body.return,
        });
    } else return await renderBadRequest(res);
});

app.use('/dist', express.static('client-dist'));
app.use('/assets', express.static('assets'));

// 404 page
app.use(async (req, res) => {
    await renderNotFound(res);
});

app.listen(config.port, () => {
    console.log(`Listening on :${config.port}`)
});
