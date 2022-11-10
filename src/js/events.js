let formSubmit = true;
export function clickPokemon(elements) {
    for (let index = 0; index < elements.length; index++) {
        elements[index].addEventListener('click',function(){
            if(this.querySelector(".pokemon__item__checkbox").checked){
                this.querySelector(".pokemon__item__checkbox").checked = false;
                this.classList.remove('pokemon__item--checked');
            }
            else if(document.querySelectorAll('input[type=checkbox]:checked').length == 6){
                alert('Únicamente puedes seleccionar 6 pokémon.');
            }
            else{
                this.querySelector(".pokemon__item__checkbox").checked = true;
                this.classList.add('pokemon__item--checked'); 
            } 
        });
    }
}

export function savePokemon(element){
    let elementError = document.querySelector('.form__error');
    let elementNickname = document.querySelector('[name="nickname"]');
    let elementPokemonChecked = 0;
    
    element.addEventListener('click',function(){
        elementPokemonChecked = document.querySelectorAll('input[type=checkbox]:checked');
        elementError.innerHTML = '';
        
        if(elementNickname.value === ''){
            elementError.innerHTML = 'Debe ingresar el nickname.';
            return
        }
        if(elementNickname.value.length < 5){
            elementError.innerHTML = 'El nickname debe tener al menos 5 caracteres.';
            return
        }
        if(elementNickname.value.length > 10){
            elementError.innerHTML = 'El nickname debe tener más de 200 caracteres.';
            return
        }
        if(elementPokemonChecked.length != 6){
            elementError.innerHTML = 'Debe seleccionar 6 pokémon.';
            return
        }

        let listPokemon = [];
        for (let index = 0; index < elementPokemonChecked.length; index++) {
            listPokemon.push(elementPokemonChecked[index].value);
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer EAAHZ',
            },
            body: JSON.stringify({
                nickname : elementNickname.value,
                listPokemon: listPokemon,
            })
         };
        
         if(formSubmit){
            formSubmit = false;
            fetch('http://127.0.0.1:8000/api/pokemon/create', options)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(response => {
                if(response.body.status === 1){
                    document.querySelector('.form__success').style.display = "block";
                    document.querySelector('.form__btn-save').style.display = "none";
                    document.querySelector('#list-pokemon').style.display = "none";
                    elementNickname.value = '';
                }
                else if(response.body.status === 2){
                    let errors = response.body.message;
                    let errorkeys = Object.keys(response.body.message);

                    for (let index = 0; index < errorkeys.length; index++) {
                        debugger
                        let key = errorkeys[index];
                        console.log(errors[key][0]);
                        elementError.innerHTML += errors[key][0]+'<br>';
                    } 
                }
                else{
                    elementError.innerHTML = response.body.message;
                } 
                formSubmit = true;    
            })
            .catch(err => {
                elementError.innerHTML = err;
                formSubmit = true;
            });
        }
    });
}
  