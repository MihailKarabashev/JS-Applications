function attachEvents() {
    document.querySelector('#submit').addEventListener('click', sendMessage);
    document.querySelector('#refresh').addEventListener('click', getMessageData);
}

attachEvents();


async function getMessageData(){
    let messageArea = document.querySelector('#messages');
    
    let response = await fetch("http://localhost:3030/jsonstore/messenger");
    let data = await response.json();
    
    messageArea.removeAttribute('disabled');
    messageArea.value = '';

   Object.values(data).forEach(x=> {
      messageArea.value += `${x.author}: ${x.content}\n`;
   });
}

async function sendMessage(){
     let inputs = document.querySelectorAll('input[type=text]');
     let author = inputs[0].value;
     let content = inputs[1].value;
      
     let response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({author , content})
    });

    if (!response.ok) {
        return alert('Something get wrong bro !');
    }

    inputs[0].value = '';
    inputs[1].value = '';
}

