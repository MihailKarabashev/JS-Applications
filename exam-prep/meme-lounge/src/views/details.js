import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById , deleteById } from "../api/data.js";


const detailsTemplete = (meme, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${sessionStorage.userId == meme._ownerId 
            ?  html`<a class="button warning" href="/edit/${meme._id}">Edit</a> 
            <button @click = ${onDelete} class="button danger">Delete</button>`
            : ''
        }
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    let id = ctx.params.id;
    let meme = await getById(id);
    console.log(meme);

    ctx.render(detailsTemplete(meme, onDelete));

    async function onDelete(e) {
       let conformation = confirm('Are you sure you want to delete this meme ?');

       if (conformation) {
           await deleteById(id);
           ctx.setUserNav();
           ctx.page.redirect('/allMemes');
       }
    }
}
