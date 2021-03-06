import { html } from "../../node_modules/lit-html/lit-html.js";
import { getPersonlInfo } from "../api/data.js";


const myProfileTemplete = (data) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${sessionStorage.username}</p>
            <p>Email: ${sessionStorage.email}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${data.length == 0 
         ? html`
           <p class="no-memes">No memes in database.</p>
         `
         : data.map(meme => userMemeTemplete(meme))
        }
    </div>
</section>
`;

let userMemeTemplete = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;


export async function myPage(ctx) {
    let id = sessionStorage.getItem('userId');
    let memes = await getPersonlInfo(id);
    ctx.render(myProfileTemplete(memes));
}