export default {
    errors: {
        title: 'Eraro',
        badRequest: 'Via kliento sendis nevalidan peton. Eble revenu de kie vi venis por reprovi.',
        notFound: 'La paĝo kiun vi serĉas ne ekzistas. La pago, kiun vi provas plenumi, eble jam estis plenumita.',
        internalServerError: 'Okazis interna eraro. Bonvolu reprovi poste. Se la eraro daŭradas, bonvolu skribi al helpo@akso.org.',
    },
    messages: {
        submitIllegalState: 'Tiu ĉi pago nuntempe ne povas esti plenumita. Pardonon.',
        submitInternalServerError: 'Okazis interna eraro. Bonvolu reprovi poste.',
        submitSucceeded: 'Via pago estis markita kiel sendita. Oficisto sciigos vin kiam la pago estas traktita.',
        cancelIllegalState: 'Tiu ĉi pago nuntempe ne povas esti nuligita. Pardonon.',
        cancelInternalServerError: 'Okazis interna eraro. Bonvolu reprovi poste.',
        setNotesSucceeded: 'Ĝisdatigis la notojn de la transakcio',
        setNotesFailed: 'Okazis eraro dum ĝisdatigo de la notoj. Bonvolu poste reprovi.',
    },
    order: {
        pageTitle: {
            akso: 'Via mendo — AKSO-Pago',
            tejo: 'Via mendo ĉe TEJO',
            uea: 'Via mendo ĉe UEA',
        },
        title: 'Via mendo',
        refId: 'Mendo-numero',
        total: 'Sume',

        customerNotes: 'Notoj',
        customerNotesPlaceholder: 'Tie ĉi eblas aldoni notojn pri via pago. Se vi elektis permanan pagmetodon, kiu postulas intervenon de oficisto, tiu legos viajn notojn dum traktado de via mendo.',
        updateCustomerNotes: 'Ĝisdatigi',
    },
    methods: {
        expiresIn: 'Via mendo eksvalidiĝos',
        manual: {
            description: 'Bonvolu sendi la pagon laŭ la ĉi-supraj instrukcioj kaj poste alklaku la butonon “Pago sendita” por ke oficisto povu trakti vian pagon. Se vi bezonas pli da tempo por plenumi la pagon, vi povas konservi la retadreson de tiu ĉi paĝo; nur atentu pri la eksvalidiĝa tempo de la mendo.',
            submit: 'Pago sendita',
        },
        stripe: {
            noscript: 'Bonvolu ŝalti JavaScript en via retumilo por plenumi vian mendon.',
            customerName: 'Via nomo',
            customerEmail: 'Via retpoŝtadreso',
            customerEmailDescription: 'Ni sendos kvitancon al tiu ĉi adreso.',
            cardNumber: 'Numero de pagkarto',
            processing: 'Stripe traktas vian kartan pagon ...',
            submit: 'Pagi',
            success: 'Via pago estis sukcese traktita',
            succeededReturnButton: 'Reveni al la retejo',
        },
        cancel: 'Nuligi pagon',
    },
    statuses: {
        processing: {
            title: 'Traktas vian pagon ...',
            description: 'Dankon. Via mendo estas traktata kaj vi baldaŭ ricevos kvitancon',
        },
        submitted: {
            title: 'Pago sendita',
            description: 'Oficisto nun baldaŭ traktos vian pagon kaj konfirmos vian mendon. Dankon pro via mendo.',
        },
    },
    cancel: {
        title: 'Nuligi pagon',
        description: 'Ĉu vi certas, ke vi volas nuligi la transakcion?',
        no: 'Reen',
        yes: 'Nuligi',

        successTitle: 'La transakcio estis nuligita',
        successDescription: '' // no description needed
    },
    stripeErrors: {
        UNKNOWN: 'Okazis nekonata eraro dum traktado de via pago. Bonvolu reprovi poste',
        // client-side validation
        incomplete_card: 'Bonvolu plenigi viajn kartinformojn',
        invalid_number: 'La numero de via pagkarto estas nevalida',
        incomplete_number: 'La numero de via pagkarto estas nekompleta',
        incomplete_expiry: 'La eksvalidiĝa dato de via pagkarto estas nekompleta',
        invalid_expiry_year_past: 'Via pagkarto jam eksvalidiĝis',
        invalid_expiry_year: 'La jaro de la eksvalidiĝo de via pagkarto estas nevalida',
        invalid_expiry_month_past: 'Via pagkarto jam eksvalidiĝis',
        invalid_expiry_month: 'Via pagkarto jam eksvalidiĝis',
        incomplete_cvc: 'La sekurkodo de via pagkarto estas nekompleta',
        incomplete_zip: 'Via poŝtkodo estas nekompleta',

        // other errors (anything not translated here will show Stripe’s message)
        card_declined: "La transakcio estis rifuzita de la provizoranto de via pagkarto",
        card_declined_card_not_supported: "La speco de via karto ne estas subtenata",
        card_number_in_name_field: "Bonvolu ne meti la numeron de via karto en la kampon por via nomo",
        card_number_in_postal_code_field: "Bonvolu ne meti la numeron de via karto en la en la kampon por via poŝtkodo",
        // customer_canceled_authentication: "You must authenticate to complete this transaction.",
        email_invalid: "La retpoŝtadreso estas nevalida",
        expired_card: "La eksvalidiĝa dato de via pagkarto estas nekompleta",
        incomplete_au_bank_account_bsb: "La BSB estas nekompleta",
        incomplete_au_bank_account_number: "La kontonumero estas nekompleta",
        incomplete_iban: "La IBAN-numero estas nekompleta",
        incomplete_payment_details: "Mankas kelkaj pagdetaloj; bonvolu enmeti ilin",
        incorrect_cvc: "La sekureckodo de via pagkarto estas nevalida",
        incorrect_number: "La numero de via pagkarto estas nevalida",
        incorrect_zip: "La numero de via pagkarto kaj via poŝtkodo ne kongruas",
        invalid_au_bank_account_bsb: "La BSB estas nevalida",
        // invalid_au_bank_account_number_testmode: "The account number you entered is not valid in testmode.",
        invalid_cvc: "La sekureckodo de via pagkarto estas nevalida",
        invalid_iban: "La IBAN-umero estas nevalida",
        invalid_iban_country_code: "La IBAN-numero estas nevalida, ĉar \"{code}\" ne estas subtenata landokodo",
        invalid_iban_start: "La IBAN-numero devas komenciĝi je dulitera landokodo",
        payment_intent_authentication_failure: "Ni ne sukcesis aŭtentigi vian pagmetodon. Bonvolu reveni por elekti alian pagmetodon kaj reprovu. Pardonon.",
        payment_intent_unexpected_state: "Okazis interna eraro dum traktado de via pago. Bonvolu reprovi.",
        process_error_intransient: "Okazis eraro dum traktado de via pago. Bonvolu reprovi.",
        processing_error: "Okazis eraro dum traktado de via pago. Bonvolu reprovi.",
        // setup_intent_authentication_failure: "We are unable to authenticate your payment method. Please choose a different payment method and try again.",
        // setup_intent_unexpected_state: "A processing error occurred.",
        // unexpected: "An unexpected error occurred.",
    },
};
