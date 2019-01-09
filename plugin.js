let form = document.forms.fullstack;

form.addEventListener('submit', validator);

let rules = {
    required: function (el) {
      if(el.value != ''){
          return true;
      }
      return false;
    },
    email: function (el) {
        let reg = /^\w{1,}@\w{1,}\.\w{2,}$/;
        return reg.test(el.value);
    },
    text: function (el) {
        if((el.value.indexOf('"') == -1) && (el.value.indexOf("'")  == -1)){
            return true;
        }
        return false;
    }
}

function checkRadio(name) {
    let classRadioMessage = document.getElementsByClassName(name);
    classRadioMessage[0].style.display = 'none';

    let namesRadio = document.getElementsByName(name);
    for(let i = 0; i < namesRadio.length; i ++){
        if(namesRadio[i].checked){
            return true;
        }
    }

    classRadioMessage[0].style.display = 'block';
    return false;
}

function validator(e) {
    e.preventDefault();

    let errors = false;             // если есть хоть одна ошибка то присваиваем true

    if(!checkRadio('gender')){      // проверка radio buttons
        errors = true;
    }

    let inputs = this.elements;
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].getAttribute('data-validation') != null){
            inputs[i].classList.remove('is-invalid');
            let rulesList = inputs[i].dataset.validation;
            rulesList = rulesList.split(' ');
            for(let k = 0; k < rulesList.length; k++){
                if(rulesList[k] in rules) {
                    if(!rules[rulesList[k]](inputs[i])){   //если есть ошибки
                        inputs[i].classList.add('is-invalid');
                        if(rulesList[k] == 'required'){
                            inputs[i].nextElementSibling.innerHTML = 'This field is required'
                        } else {inputs[i].nextElementSibling.innerHTML = inputs[i].name + ' is not valid'}
                        errors = true;
                        break;      // выходим если обнаружили ошибку
                    }
                }
            }
        }
    }

    if(!errors){        // если нет ошибок вывести сообщение
        alert('Validation passed.')
    }
}
