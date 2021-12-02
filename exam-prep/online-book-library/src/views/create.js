import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";


const createBookTemplete = (onSubmit) => html`
<section id="create-page" class="create">
    <form id="create-form" action="" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section>
`;

export async function createPage(ctx) {
    ctx.render(createBookTemplete(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);


        let obj = {
            title: formData.get("title"),
            description: formData.get("description"),
            imageUrl: formData.get("imageUrl"),
            type: formData.get("type"),
        };

        if (!obj.title || !obj.description || !obj.imageUrl || !obj.type) {
            return alert('All fields must be filled !');
        }

        await create(obj);
        ctx.setUserNav();
        ctx.page.redirect('/index.html');
    }
}