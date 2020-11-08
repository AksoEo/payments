import './index.less';
import locale from '../locale';

document.querySelector('.header-back-container').addEventListener('click', (e) => {
    if (e.target.hasAttribute('href')) return;
    window.history.back();
});

function initStripe() {
    if (!('Stripe' in window)) return;
    const Stripe = window.Stripe;
    // stripe has been loaded for this page

    const form = document.querySelector('#stripe-form');
    const container = document.querySelector('#stripe-elements');
    const errorContainer = form.querySelector('.form-error-container');
    if (!container) return;

    function hideError () {
        errorContainer.textContent = '';
    }

    const noscript = form.querySelector('.stripe-elements-noscript');
    if (noscript) noscript.parentNode.removeChild(noscript);

    const stripe = Stripe(container.dataset.stripePk);

    const elements = stripe.elements();

    const card = elements.create('card');
    card.mount(container.querySelector('.stripe-card-input'));
    const cardError = container.querySelector('.stripe-card-error');
    card.on('change', (e) => {
        hideError();

        if (e.error) {
            console.log(e.error);
            cardError.textContent = locale.stripeErrors[e.error.code] || e.error.message;
        } else {
            cardError.textContent = '';
        }
    });

    const submitButton = form.querySelector('.submit-button');

    function showSuccess() {
        const formContents = form.querySelector('.form-contents');
        const formHeight = formContents.offsetHeight;
        formContents.innerHTML = '';

        if (form.dataset.return) {
            submitButton.textContent = locale.methods.stripe.succeededReturnButton;
            submitButton.addEventListener('click', e => {
                e.preventDefault();
                window.location = form.dataset.return;
            });
        } else {
            submitButton.classList.add('is-hidden');
        }

        const successContainer = document.createElement('div');
        successContainer.className = 'payment-success-container';
        const success = document.createElement('div');
        success.className = 'payment-success';
        success.textContent = locale.methods.stripe.success;
        successContainer.appendChild(success);
        formContents.appendChild(successContainer);

        const newHeight = successContainer.offsetHeight;
        successContainer.style.height = formHeight + 'px';
        setTimeout(() => {
            successContainer.style.transition = 'height 500ms cubic-bezier(0.2, 0.3, 0, 1)';
            successContainer.style.height = newHeight + 'px';
            setTimeout(() => {
                successContainer.style.transition = '';
                successContainer.style.height = '';
            }, 500);
        }, 16);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        hideError();
        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
        submitButton.classList.remove('is-error');

        const clientSecret = container.dataset.stripeCs;

        stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        }).then(result => {
            if (result.error) {
                const errorMessage = locale.stripeErrors[result.error.code] || result.error.message;
                errorContainer.textContent = errorMessage;
                submitButton.classList.add('is-error');
            } else if (result.paymentIntent.status === 'succeeded') {
                showSuccess();
            }
        }).catch(error => {
            console.error('Unknown error submitting payment', error);
            errorContainer.textContent = locale.stripeErrors.UNKNOWN;
            submitButton.classList.add('is-error');
        }).then(() => {
            submitButton.disabled = false;
            submitButton.classList.remove('is-loading');
        });
    });
}
initStripe();
