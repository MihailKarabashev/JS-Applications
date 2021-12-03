import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";



let main = document.querySelector('#main-content');
document.querySelector('#logout-btn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/index.html');
});

page('/', customMiddleware, homePage);
page('/index.html', customMiddleware, homePage);
page('/login', customMiddleware, loginPage);
page('/register', customMiddleware, registerPage);
page('/create', customMiddleware, createPage);
page('/details/:id', customMiddleware, detailsPage);
page('/edit/:id', customMiddleware, editPage);




page.start();
setUserNav();


function setUserNav() {
    let email = sessionStorage.getItem("email");

    if (email) {
        document.querySelector("#user").style.display = "block";
        document.querySelector("#guest").style.display = "none";
    } else {
        document.querySelector("#user").style.display = "none";
        document.querySelector("#guest").style.display = "block";
    }
}


function customMiddleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}
