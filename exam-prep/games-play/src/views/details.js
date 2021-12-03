import { html } from '../../node_modules/lit-html/lit-html.js'
import { getById, deleteById } from '../api/data.js';


const detailsTemplete = (card, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${card.imageUrl}" />
            <h1>Bright</h1>
            <span class="levels">MaxLevel: ${card.maxLevel}</span>
            <p class="type">${card.category}</p>
        </div>

        <p class="text">
            ${card.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- list all comments for current game (If any) -->
                <li class="comment">
                    <p>Content: I rate this one quite highly.</p>
                </li>
                <li class="comment">
                    <p>Content: The best game.</p>
                </li>
            </ul>
            <!-- Display paragraph: If there are no games in the database -->
            <p class="no-comment">No comments.</p>
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${
            sessionStorage.getItem('userId') == card._ownerId 
            ? html `
             <div class="buttons">
               <a href="/edit/${card._id}" class="button">Edit</a>
                <a  @click=${onDelete} class="button">Delete</a>
            </div>
            `
            : ''
        }
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>

</section>
`;


export async function detailsPage(ctx) {
    let cardId = ctx.params.id;
    let card = await getById(cardId);

    ctx.render(detailsTemplete(card, onDelete))

    async function onDelete() {
        let confrmation = confirm('Are you sure you want to delete this card ?');

        if (confrmation) {
            await deleteById(cardId);
            ctx.setUserNav();
            ctx.page.redirect('/index.html');
        }
    }
}