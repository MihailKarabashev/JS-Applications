import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAll } from '../api/data.js';

const homeTemplete = (cards) => html`

<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>
           
        ${
            cards.lenght == 0 
            ? html`<p class="no-articles">No games yet</p>`
            : cards.map(card => gameCardTemplete(card))
        }
    </div>
</section>
`;

const gameCardTemplete = (card) => html`
<div class="game">
    <div class="image-wrap">
        <img src="${card.imageUrl}">
    </div>
    <h3>${card.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/details/${card._id}" class="btn details-btn">Details</a>
    </div>
</div>
`


export async function homePage(ctx) {
    const latestGames = await getAll();
    ctx.render(homeTemplete(latestGames));
}