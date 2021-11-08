import {html} from 'https://unpkg.com/lit-html?module';
import {getById, del} from '../api/data.js'


let detailsTemplate = (furniture, onDelete) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${furniture.img.split(/.(.+)/)[1]}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${furniture.make}</span></p>
                <p>Model: <span>${furniture.model}</span></p>
                <p>Year: <span>${furniture.year}</span></p>
                <p>Description: <span>${furniture.description}</span></p>
                <p>Price: <span>${furniture.price}</span></p>
                <p>Material: <span>${furniture.material}</span></p>
                <div>
                    <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
                    <a @click= "${onDelete}" class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>
`;

export async function detailsPage(ctx){
    let data = await getById(ctx.params.id);
    ctx.render(detailsTemplate(data,onDelete));

    async function onDelete(e){

        const delConformation = confirm('Are you sure want to delete this furniture ?');

        if (!delConformation) {
            return;
        }

        await del(ctx.params.id);
        ctx.page.redirect('/');
    }
}