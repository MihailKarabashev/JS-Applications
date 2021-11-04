import {html, render} from 'https://unpkg.com/lit-html?module';
import {towns} from './towns.js';

let searchedText = document.querySelector('#searchText');

let templete = (towns) => html`
  <ul>
     ${towns.map(x => x.startsWith(searchedText)
      ? html`<li class="active" >${x}</li>`
      :html`<li >${x}</li>`)
   };
  </ul>
`;

let div = document.querySelector('#towns');
let result = document.querySelector('#result');

document.querySelector('button').addEventListener('click', search)

render(templete(towns) , div);


function search(e) {
   div.innerHTML = '';

   render(templete(towns) , div);
}


