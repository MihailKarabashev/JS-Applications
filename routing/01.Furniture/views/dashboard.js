import {html} from 'https://unpkg.com/lit-html?module';
import { getAll } from '../api/data.js';

let templete = (data) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
           ${data.map(cardTemplete)}
        </div>
</div>
`;

let cardTemplete = (furniture) => html`
    <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${furniture.img}" />
                        <p>${furniture.description}</p>
                        <footer>
                            <p>Price: <span>${furniture.price} $</span></p>
                        </footer>
                        <div>
                            <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
                        </div>
                    </div>
                </div>
            </div>
`;


export async function dashboardPage(ctx){
    let data = await getAll();
    ctx.setUserNavigation();
     ctx.render(templete(data));
}