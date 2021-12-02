import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";
import { notify } from "./notification.js";


const createMemeTemplete = (onSubmit) => html`
<section id="create-meme">
    <form id="create-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

export async function createPage(ctx) {

    ctx.render(createMemeTemplete(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let obj = {
            title: formData.get("title"),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
        };

        if (!obj.title || !obj.description || !obj.imageUrl) {
            return notify('All fields must be filled');
        }

        await create(obj);
        ctx.setUserNav();
        ctx.page.redirect('/allMemes');
    }
}