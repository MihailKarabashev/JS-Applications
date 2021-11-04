import {html, render} from 'https://unpkg.com/lit-html?module';
import {catTemplete} from './cat.js';
import {cats} from './catSeeder.js'

let catListTemplete = (cats) => html`
  <ul>
      ${cats.map(catTemplete)};
  </ul>
`;


let catSection = document.querySelector('#allCats');

render(catListTemplete(cats), catSection);


catSection.addEventListener('click', (e) => {
   if (!e.target.classList.contains('showBtn')) {
       return;
   }
   let button = e.target;

   let parent = e.target.parentElement;
   
   let hiddenDiv = parent.querySelector('.status');
   if (hiddenDiv.style.display == 'none') {
     hiddenDiv.style.display = 'block';
     button.textContent = 'Hide status code';
   }else {
    hiddenDiv.style.display = 'none';
    button.textContent = 'Show status code';
   }
});

