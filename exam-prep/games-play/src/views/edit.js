import { html } from '../../node_modules/lit-html/lit-html.js'
import { getById, edit } from '../api/data.js';


const editTemplete = (card, onEdit) => html`
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onEdit}>
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value="${card.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value="${card.category}">

            <label for=" levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${card.maxLevel}">

            <label for=" game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value="${card.imageUrl}">

            <label for=" summary">Summary:</label>
            <textarea name="summary" id="summary">${card.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`


export async function editPage(ctx) {
    let cardId = ctx.params.id;
    let cardToEdit = await getById(cardId);
    ctx.render(editTemplete(cardToEdit, onEdit));

    async function onEdit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);


        let obj = {
            title: formData.get('title'),
            category: formData.get('category'),
            maxLevel: formData.get('maxLevel'),
            imageUrl: formData.get('imageUrl'),
            summary: formData.get('summary')
        };

        if (!obj.title || !obj.category || !obj.maxLevel || !obj.imageUrl || !obj.summary) {
            return alert('All fields must be filled !');
        }

        await edit(cardId, obj);
        ctx.setUserNav();
        ctx.page.redirect('/details/' + cardId);
    }
}