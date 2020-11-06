import './index.less';

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#page-back-button').addEventListener('click', () => {
        window.history.back();
    });
});

if ('Stripe' in window) {
    // stripe has been loaded for this page
    // ... TODO: do things when stripe works
}
