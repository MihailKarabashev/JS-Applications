import {html} from 'https://unpkg.com/lit-html?module';
import {getById} from '../api/data.js'


let detailsTemplate = (furniture) => html`
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
                    <a href=”#” class="btn btn-info">Edit</a>
                    <a href=”#” class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>
`;

export async function detailsPage(ctx){
    let data = await getById(ctx.params.id);
    ctx.render(detailsTemplate(data));
}