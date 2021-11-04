import {html, render} from 'https://unpkg.com/lit-html?module';
import {templateCard} from './card.js';
import { contacts } from './contacts.js';


let templete = (conts) => html`
    <h1>My contacts</h1>
    <div id='contacts'>
     ${conts.map(templateCard)};
    </div>
`;

render(templete(contacts), document.body);
