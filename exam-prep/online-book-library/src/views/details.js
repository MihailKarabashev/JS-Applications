import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById , deleteById} from "../api/data.js";


const detailsTemplete = (book,onDelete) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${sessionStorage.getItem('userId') == book._ownerId
                 ? html`
                  <a class="button" href="/edit/${book._id}">Edit</a>
                  <a class="button" @click = ${onDelete}>Delete</a>`
                 : ''
            }

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            <a class="button" href="#">Like</a>

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`

export async function detailsPage(ctx) {
    let book = await getById(ctx.params.id);
    ctx.render(detailsTemplete(book,onDelete));

    async function onDelete(){

        let conformation = confirm('Are you sure you want to delete this book ?');

        if (conformation) {
            await deleteById(ctx.params.id);
            ctx.setUserNav();
            ctx.page.redirect('/index.html');
        }
    }
}