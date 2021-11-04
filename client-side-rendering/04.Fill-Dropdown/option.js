import {html} from 'https://unpkg.com/lit-html?module';


export let optionTemplete = (data) => html`
  <option .value = ${data._id} >${data.text}</option>
`;