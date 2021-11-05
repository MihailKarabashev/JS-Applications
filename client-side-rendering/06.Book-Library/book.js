import {html} from 'https://unpkg.com/lit-html?module';
import {ifDefined} from './../node_modules/lit-html/directives/if-defined.js'


let tableTemplete = (books) => html`
  <table>
  <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id='body-id'>
          ${books.map(bookTemplete)}
        </tbody>
  </table>
`;

let bookTemplete = (book) => html`
     <tr>  
         <td>${book.title}</td>
         <td>${book.author}</td>
        <td id=${book._id}>
             <button class='editBtn'>Edit</button>
            <button class='deleteBtn'>Delete</button>
         </td>
    </tr>
`;

let formTemplete = (form) => html`
    <form class="${ifDefined(form.class)}" id="${form.id}">
        ${form.hasHiddenField 
        ? html`<input type="hidden" name="id">`
        : ''
       }
        <h3>${form.action}</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value = ${form.buttonValue}>
    </form>
`;

export let bookOverViewTemplete = (books, forms) => html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
     ${tableTemplete(books)}
     ${forms.map(formTemplete)}
`;
