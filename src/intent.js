import { AppClient } from '@tejo/akso-client';

let app = null;

export function initAPI(host, key, secret) {
    app = new AppClient({
        apiKey: key,
        apiSecret: secret,
        host,
    });
}

export async function fetchIntent(intentId) {
    const res = await app.get(`/aksopay/payment_intents/${intentId}`, {
        fields: [
            'org',
            'customer.name',
            'currency',
            'purposes',
            'paymentOrgId',
            'paymentMethodId',
            'paymentMethod',
            'status',
            'stripePaymentIntentId',
            'totalAmount',
            'timeCreated',
        ],
    });
    return res.body;
}

export async function markSubmitted(intentId) {
    try {
        await app.post(`/aksopay/payment_intents/${intentId}/!submit`);
        return null;
    } catch (err) {
        if (err.statusCode === 409) return 'illegal-state';
        return err;
    }
}
