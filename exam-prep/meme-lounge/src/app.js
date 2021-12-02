import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { homePage } from "./views/home.js";


let main = document.querySelector('main');
console.log(main);

page('/', customMiddleware, homePage);
page('/index.html', customMiddleware, homePage);

page.start();
setUserNav();


function setUserNav() {
    let email = sessionStorage.getItem("email");

    if (email) {
        document.querySelector(".user").style.display = "block";
        document.querySelector(".guest").style.display = "none";
    } else {
        document.querySelector(".user").style.display = "none";
        document.querySelector(".guest").style.display = "block";
    }
}


function customMiddleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}
