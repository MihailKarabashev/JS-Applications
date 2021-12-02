import { html } from "../../node_modules/lit-html/lit-html.js";
import { edit, getById } from "../api/data.js";



const editTemplete = (meme, onSubmit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`

export async function editPage(ctx) {
    let id = ctx.params.id;
    let meme = await getById(id);
    console.log(meme);

    ctx.render(editTemplete(meme, onSubmit));


    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let obj = {
            title: formData.get("title"),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
        };

        try {
            if (!obj.title || !obj.description || !obj.imageUrl) {
                throw new Error('All fields must be filled');
            }

            await edit(id, obj);
            ctx.setUserNav();
            ctx.page.redirect('/details/' + id);
        } catch (error) {
            alert(error.message);
        }
    }
}