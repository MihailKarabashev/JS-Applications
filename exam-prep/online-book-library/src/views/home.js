import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";


const homeTemplete = (books) => html`

`;


export async function homePage(ctx) {

    let books = await getAll();
    ctx.render(homePage(books))
}