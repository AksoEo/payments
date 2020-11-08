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
    },
    order: {
        pageTitle: {
            akso: 'Via mendo — AKSO-Pago',
            tejo: 'Via mendo ĉe TEJO',
            uea: 'Via mendo ĉe UEA',
        },
        title: 'Via mendo',
        total: 'Sume',
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
            submit: 'Pagi',
        },
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
    stripeErrors: {
        incomplete_card: 'Bonvolu plenigi viajn kartinformojn',
        invalid_number: 'La numero de via pagkarto estas nevalida',
        incomplete_number: 'La numero de via pagkarto estas nekompleta',
        incomplete_expiry: 'La eksvalidiĝa dato de via pagkarto estas nekompleta',
        invalid_expiry_year_past: 'Via pagkarto jam eksvalidiĝis',
        invalid_expiry_year: 'La jaro de la eksvalidiĝo de via pagkarto estas nevalida',
        invalid_expiry_month_past: 'Via pagkarto jam eksvalidiĝis',
        incomplete_cvc: 'La sekurkodo de via pagkarto estas nekompleta',
        incomplete_zip: 'Via poŝtkodo estas nekompleta',
    },
};
