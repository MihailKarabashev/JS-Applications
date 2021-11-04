import {html} from 'https://unpkg.com/lit-html?module';


export let templete = (towns) => html`
   <ul>
       ${towns.split(', ').map(x=> html`<li>${x} </li>`)};
   </ul>
`;