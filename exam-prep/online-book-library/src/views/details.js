import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById , deleteById, addLike , getBookLikes} from "../api/data.js";


const detailsTemplete = (book,onDelete, isUserLoggedIn,onLikeSubmit,bookLikesCount) => html`
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
            ${isUserLoggedIn() == true ? html`<a class="button" @click=${onLikeSubmit} >Like</a>` : ''}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${bookLikesCount}</span>
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
    let id = ctx.params.id;
    let book = await getById(id);
    let bookLikesCount = await getBookLikes(id);
    console.log(bookLikesCount);
    ctx.render(detailsTemplete(book,onDelete,isUserLoggedIn, onLikeSubmit,bookLikesCount));

    async function onDelete(){

        let conformation = confirm('Are you sure you want to delete this book ?');

        if (conformation) {
            await deleteById(id);
            ctx.setUserNav();
            ctx.page.redirect('/index.html');
        }
    }

    async function onLikeSubmit(){
       await addLike({_id : id,});
       ctx.setUserNav();
       ctx.page.redirect('/details/' + id);
    }
    
   function isUserLoggedIn(){
       let user = sessionStorage.getItem('userId');

       if (user!= null && user != book._ownerId) {
           return true;
       }

       return false;
   }
}

