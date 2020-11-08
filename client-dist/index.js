(function () {
    'use strict';

    var locale = {
      errors: {
        title: 'Eraro',
        badRequest: '[[Bad request]]',
        notFound: '[[The page could not be found. The payment you’re looking for may have been approved or refunded or disputed or any of those other things.]]',
        internalServerError: '[[Internal server error]]'
      },
      messages: {
        submitIllegalState: '[[This PaymentIntent may not be submitted]]',
        submitInternalServerError: '[[Failed to submit because of an internal server error]]',
        submitSucceeded: '[[Successfully marked payment as submitted]]'
      },
      order: {
        pageTitle: {
          akso: '[[Your Order — AKSO Pay™]]',
          tejo: '[[Your Order — TEJO]]',
          uea: '[[Your Order — UEA]]'
        },
        title: '[[Your Order]]',
        total: '[[Total]]'
      },
      methods: {
        expiresIn: '[[Payment validity expires ]]',
        manual: {
          description: '[[Please submit the payment according to instructions above (I assume paymentMethod.description will include details?) and then mark the payment as submitted so that we may verify it or something. Also you can bookmark this page if you want but you probably shouldn’t share the URL with people]]',
          submit: '[[Mark submitted]]'
        },
        stripe: {
          noscript: '[[Please enable Javascript to use this form]]',
          customerName: '[[Name]]',
          customerEmail: '[[Email]]',
          customerEmailDescription: '[[A receipt will be sent to this address.]]',
          cardNumber: '[[Credit Card Number]]',
          submit: '[[Buy]]',
          success: '[[Payment succeeded]]',
          succeededReturnButton: '[[Return]]'
        }
      },
      statuses: {
        processing: {
          title: '[[Processing Payment]]',
          description: '[[The payment is being processed. You can check back later I guess?]]'
        },
        submitted: {
          title: '[[Payment Submitted]]',
          description: '[[You claim to have submitted a payment, but it still has to be verified by an administrator.]]'
        }
      },
      stripeErrors: {
        UNKNOWN: '[[Internal error.]]',
        // client-side validation
        incomplete_card: '[[Please fill out your card details.]]',
        invalid_number: '[[Your card number is invalid.]]',
        incomplete_number: '[[Your card number is incomplete.]]',
        incomplete_expiry: '[[Your card’s expiration date is incomplete.]]',
        invalid_expiry_year_past: '[[Your card’s expiration date is in the past.]]',
        invalid_expiry_year: '[[Your card’s expiration year is invalid.]]',
        invalid_expiry_month_past: '[[Your card’s expiration date is in the past.]]',
        invalid_expiry_month: '[[Your card’s expiration date is invalid.]]',
        incomplete_cvc: '[[Your card’s security code is incomplete.]]',
        incomplete_zip: '[[Your postal code is incomplete.]]' // other errors (anything not translated here will show Stripe’s message)
        // card_declined: "Your card has been declined.",
        // card_declined_card_not_supported: "Your card is not supported.",
        // card_number_in_name_field: "Please make sure that the name field doesn't contain a card number.",
        // card_number_in_postal_code_field: "Please make sure that the postal code field doesn't contain a card number.",
        // customer_canceled_authentication: "You must authenticate to complete this transaction.",
        // email_invalid: "Invalid email address.",
        // expired_card: "Your card has expired.",
        // incomplete_au_bank_account_bsb: "The BSB you entered is incomplete.",
        // incomplete_au_bank_account_number: "The account number you entered is incomplete.",
        // incomplete_iban: "The IBAN you entered is incomplete.",
        // incomplete_payment_details: "Please provide complete payment details.",
        // incorrect_cvc: "Your card's security code is incorrect.",
        // incorrect_number: "Your card number is incorrect.",
        // incorrect_zip: "Your card number and postal code do not match.",
        // invalid_au_bank_account_bsb: "The BSB you entered is invalid.",
        // invalid_au_bank_account_number_testmode: "The account number you entered is not valid in testmode.",
        // invalid_cvc: "Your card's security code is invalid.",
        // invalid_iban: "The IBAN you entered is invalid.",
        // invalid_iban_country_code: "The IBAN you entered is invalid, \"{code}\" is not a supported country code.",
        // invalid_iban_start: "Your IBAN should start with a two-letter country code.",
        // payment_intent_authentication_failure: "We are unable to authenticate your payment method. Please choose a different payment method and try again.",
        // payment_intent_unexpected_state: "A processing error occurred.",
        // process_error_intransient: "An error occurred while processing your card.",
        // processing_error: "An error occurred while processing your card. Try again in a little bit.",
        // setup_intent_authentication_failure: "We are unable to authenticate your payment method. Please choose a different payment method and try again.",
        // setup_intent_unexpected_state: "A processing error occurred.",
        // unexpected: "An unexpected error occurred.",

      }
    };

    document.querySelector('.header-back-container').addEventListener('click', function (e) {
      if (e.target.hasAttribute('href')) return;
      window.history.back();
    });

    function initStripe() {
      if (!('Stripe' in window)) return;
      var Stripe = window.Stripe; // stripe has been loaded for this page

      var form = document.querySelector('#stripe-form');
      var container = document.querySelector('#stripe-elements');
      var errorContainer = form.querySelector('.form-error-container');
      if (!container) return;

      function hideError() {
        errorContainer.textContent = '';
      }

      var noscript = form.querySelector('.stripe-elements-noscript');
      if (noscript) noscript.parentNode.removeChild(noscript);
      var stripe = Stripe(container.dataset.stripePk);
      var elements = stripe.elements();
      var card = elements.create('card');
      card.mount(container.querySelector('.stripe-card-input'));
      var cardError = container.querySelector('.stripe-card-error');
      card.on('change', function (e) {
        hideError();

        if (e.error) {
          console.log(e.error);
          cardError.textContent = locale.stripeErrors[e.error.code] || e.error.message;
        } else {
          cardError.textContent = '';
        }
      });
      var submitButton = form.querySelector('.submit-button');

      function showSuccess() {
        var formContents = form.querySelector('.form-contents');
        var formHeight = formContents.offsetHeight;
        formContents.innerHTML = '';

        if (form.dataset["return"]) {
          submitButton.textContent = locale.methods.stripe.succeededReturnButton;
          submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.location = form.dataset["return"];
          });
        } else {
          submitButton.classList.add('is-hidden');
        }

        var successContainer = document.createElement('div');
        successContainer.className = 'payment-success-container';
        var success = document.createElement('div');
        success.className = 'payment-success';
        success.textContent = locale.methods.stripe.success;
        successContainer.appendChild(success);
        formContents.appendChild(successContainer);
        var newHeight = successContainer.offsetHeight;
        successContainer.style.height = formHeight + 'px';
        setTimeout(function () {
          successContainer.style.transition = 'height 500ms cubic-bezier(0.2, 0.3, 0, 1)';
          successContainer.style.height = newHeight + 'px';
          setTimeout(function () {
            successContainer.style.transition = '';
            successContainer.style.height = '';
          }, 500);
        }, 16);
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideError();
        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
        submitButton.classList.remove('is-error');
        var clientSecret = container.dataset.stripeCs;
        stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card
          }
        }).then(function (result) {
          if (result.error) {
            var errorMessage = locale.stripeErrors[result.error.code] || result.error.message;
            errorContainer.textContent = errorMessage;
            submitButton.classList.add('is-error');
          } else if (result.paymentIntent.status === 'succeeded') {
            showSuccess();
          }
        })["catch"](function (error) {
          console.error('Unknown error submitting payment', error);
          errorContainer.textContent = locale.stripeErrors.UNKNOWN;
          submitButton.classList.add('is-error');
        }).then(function () {
          submitButton.disabled = false;
          submitButton.classList.remove('is-loading');
        });
      });
    }

    initStripe();

}());
