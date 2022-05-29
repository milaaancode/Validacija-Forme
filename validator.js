class Validator{
    constructor(config){
        this.elementsConfig = config;
        this.errors = {};
        this.genetaredErrorsObject();
        this.inputListener();
    }

    genetaredErrorsObject(){
        for(let key in this.elementsConfig){
            this.errors[key] = [];
        }
    }

    validateEmail(email){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true;
        }
        return false;
    }

    inputListener(){
        let inputSelector = this.elementsConfig;
        for(let key in inputSelector){
            let selector = document.querySelector(`input[name="${key}"]`);

            selector.addEventListener('input', this.validate.bind(this));
        };
    }

    validate(e){
        let elField = this.elementsConfig;

        let field = e.target;
        let fieldName = field.getAttrubute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elField[fieldName].required){
            if(fieldValue.length === ''){
                this.errors[fieldName].push('Polje je prazno');
            }
        }

        if(elField[fieldName].email){
            if(!this.validateEmail(fieldValue)){
                this.errors[fieldName].push('Email nije validan');
            }
        }

        if(fieldValue.length < elField[fieldName].minlen || fieldValue.length > elField[fieldName].maxlen){
            this.errors[fieldName].push('Polje mora imati izmedju ' + elField[fieldName].minlen + ' i ' + elField[fieldName].maxlen + ' karaktera');
        }

        if(elField[fieldName].matching){
            let matchingField = document.querySelector(`input[name="${elField[fieldName].matching}"]`);
            if(matchingField.value !== fieldValue){
                this.errors[fieldName].push('Polja se ne poklapaju');
            }

            if(this.errors[fieldName].length === 0){
                this.errors[fieldName] = [];
                this.errors[elField[fieldName].matching] = [];
            }
        }

        this.populateErrors(this.errors);
    }

    populateErrors(errors){
        for(const elem of document.querySelectorAll('ul')){
            elem.remove();
        }

        for(let key of Object.key(errors)){
            let parentElement = document.querySelectorAll(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerHTML = error;
                errorsElement.appendChild(li);
            });
        }
    }
}
