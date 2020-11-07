export default {
    errors: {
        title: 'Eraro',
        badRequest: '[[Bad request]]',
        notFound: '[[The page could not be found. The payment you’re looking for may have been approved or refunded or disputed or any of those other things.]]',
        internalServerError: '[[Internal server error]]',
    },
    messages: {
        submitIllegalState: '[[This PaymentIntent may not be submitted]]',
        submitInternalServerError: '[[Failed to submit because of an internal server error]]',
        submitSucceeded: '[[Successfully marked payment as submitted]]',
    },
    order: {
        pageTitle: {
            akso: '[[Your Order — AKSO Pay™]]',
            tejo: '[[Your Order — TEJO]]',
            uea: '[[Your Order — UEA]]',
        },
        title: '[[Your Order]]',
        total: '[[Total]]',
    },
    methods: {
        expiresIn: '[[Payment validity expires ]]',
        manual: {
            description: '[[Please submit the payment according to instructions above (I assume paymentMethod.description will include details?) and then mark the payment as submitted so that we may verify it or something. Also you can bookmark this page if you want but you probably shouldn’t share the URL with people]]',
            submit: '[[Mark submitted]]',
        },
        stripe: {
            noscript: '[[Please enable Javascript to use this form]]',
            customerName: '[[Name]]',
            customerEmail: '[[Email]]',
            customerEmailDescription: '[[A receipt will be sent to this address.]]',
            cardNumber: '[[Credit Card Number]]',
            submit: '[[Buy]]',
        },
    },
    statuses: {
        processing: {
            title: '[[Processing Payment]]',
            description: '[[The payment is being processed. You can check back later I guess?]]',
        },
        submitted: {
            title: '[[Payment Submitted]]',
            description: '[[You claim to have submitted a payment, but it still has to be verified by an administrator.]]',
        },
    },
    stripeErrors: {
        incomplete_card: '[[Please fill out your card details.]]',
        invalid_number: '[[Your card number is invalid.]]',
        incomplete_number: '[[Your card number is incomplete.]]',
        incomplete_expiry: '[[Your card’s expiration date is incomplete.]]',
        invalid_expiry_year_past: '[[Your card’s expiration date is in the past.]]',
        invalid_expiry_year: '[[Your card’s expiration year is invalid.]]',
        invalid_expiry_month_past: '[[Your card’s expiration date is in the past.]]',
        incomplete_cvc: '[[Your card’s security code is incomplete.]]',
        incomplete_zip: '[[Your postal code is incomplete.]]',
    },
};