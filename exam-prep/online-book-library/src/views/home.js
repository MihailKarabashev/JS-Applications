import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";


const homeTemplete = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${books.length == 0  
      ? html`<p class="no-books">No books in database!</p>`
      : html` <ul class="other-books-list"> ${books.map(book=> singleBookTemplete(book))}</ul>`
    }
</section>
`;

export const singleBookTemplete = (book) => html`
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <a class="button" href="/details/${book._id}">Details</a>
        </li>
`;


export async function homePage(ctx) {
    let books = await getAll();
    ctx.render(homeTemplete(books))
}