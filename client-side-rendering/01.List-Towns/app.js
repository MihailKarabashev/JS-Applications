import {render} from 'https://unpkg.com/lit-html?module';
import {templete} from './town.js';

let div = document.querySelector('#root');
let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
   e.preventDefault();

   let formData = new FormData(form);

   let towns = formData.get('towns');

   render(templete(towns), div);

   e.target.reset();
});