import { html } from "../../node_modules/lit-html/lit-html.js";
import { singleBookTemplete } from "../utils.js";
import { getUserBooks } from "../api/data.js";



const myBooksTemplete = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length == 0  
      ? html`<p class="no-books">No books in database!</p>`
      : html` <ul class="other-books-list"> ${books.map(book=> singleBookTemplete(book))}</ul>`
    }
</section>
`;


export async function myBooksPage(ctx) {
    let userId = sessionStorage.getItem('userId');
    let books = await getUserBooks(userId);
    ctx.render(myBooksTemplete(books));
}
