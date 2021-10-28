function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', loadPhonebook);
    document.querySelector('#btnCreate').addEventListener('click', createEntity);
}

attachEvents();

async function loadPhonebook(){
    let response = await fetch('http://localhost:3030/jsonstore/phonebook');
    let data = await response.json();

    let ul = document.querySelector('#phonebook');
    ul.innerHTML = '';

    Object.values(data).forEach(x=> {
        let li = loadEntity(x.person, x.phone, x._id);
        ul.appendChild(li);
    });
}

async function createEntity(){
    let inputs = document.querySelectorAll('input[type=text]');
    let person = inputs[0].value;
    let phone = inputs[0].value;

    let response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({person, phone}),
    });

    if (!response.ok) {
        return alert('WTF BRO ?');
    }

    inputs[0].value = '';
    inputs[1].value = '';

    await loadPhonebook();
}


function loadEntity(person, phone, id){
    let liElement = document.createElement('li');
    liElement.textContent = `${person}:${phone}`;

    let button = document.createElement('button');
    button.textContent = 'Delete';

    button.addEventListener('click', deleteEntity);

    liElement.appendChild(button);

    return liElement;

    async function deleteEntity(){
        let response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
           method : "DELETE",
        });

        if (!response.ok) {
            return alert('You cannot delete this entity!');
        }

        liElement.remove();
    }
}


