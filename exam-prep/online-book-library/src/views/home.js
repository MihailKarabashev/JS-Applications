import { html } from "../../node_modules/lit-html/lit-html.js";
import { singleBookTemplete } from "../utils.js";
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


export async function homePage(ctx) {
    let books = await getAll();
    ctx.render(homeTemplete(books))
}