import {html, render} from 'https://unpkg.com/lit-html?module';
import {optionTemplete} from './option.js';


window.addEventListener('load', getData);

let selectElement = document.querySelector('#menu');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

     let input = e.target.querySelector('#itemText');
     let obj = {text : input.value};

      postData(obj);
      getData();

      e.target.reset();
})


async function postData(data){
      await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
    });
}

async function getData(){
  let response =  await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
  let data = await response.json();

  let arr = Object.values(data).map(optionTemplete);

   render(arr,selectElement);
}

