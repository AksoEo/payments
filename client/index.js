import './index.less';
import locale from '../locale';

document.querySelector('#page-back-button').addEventListener('click', () => {
    window.history.back();
});

function initStripe() {
    if (!('Stripe' in window)) return;
    const Stripe = window.Stripe;
    // stripe has been loaded for this page

    const form = document.querySelector('#stripe-form');
    const container = document.querySelector('#stripe-elements');
    if (!container) return;

    const noscript = form.querySelector('.stripe-elements-noscript');
    if (noscript) noscript.parentNode.removeChild(noscript);

    const stripe = Stripe(container.dataset.stripePk);

    const elements = stripe.elements();

    const card = elements.create('card');
    card.mount(container.querySelector('.stripe-card-input'));
    const cardError = container.querySelector('.stripe-card-error');
    card.on('change', (e) => {
        if (e.error) {
            console.log(e.error);
            cardError.textContent = locale.stripeErrors[e.error.code] || e.error.message;
        } else {
            cardError.textContent = '';
        }
    });

    const submitButton = form.querySelector('.submit-button');
    const submitLoading = document.createElement('div');
    submitLoading.className = 'submit-loading';
    submitButton.appendChild(submitLoading);

    form.addEventListener('submit', e => {
        e.preventDefault();

        submitButton.disabled = true;
        submitButton.classList.add('is-loading');

        return;

        const clientSecret = container.dataset.stripeCs;

        stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        }).then(result => {

        });
    });
}
initStripe();
