let config = {
    'ime_prezime':{
        required: true,
        minlen: 3,
        maxlen: 20,
    },

    'korisnicko_ime':{
        required: true,
        minlen: 5,
        maxlen: 20,
    },

    'email':{
        required: true,
        email: true,
        minlen: 5,
        maxlen: 50,
    },

    'broj_telefona':{
        minlen: 9,
        maxlen: 15,
    },

    'lozinka':{
        required: true,
        minlen: 8,
        maxlen: 20,
        matcing: 'ponovi_lozinku',
    },

    'ponovi_lozinku':{
        required: true,
        minlen: 8,
        maxlen: 20,
        matcing: 'lozinka',
    }
}

let validator = new Validator(config);