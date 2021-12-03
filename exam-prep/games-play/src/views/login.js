import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../api/data.js';


const loginTemplete = (onSubmit) => html`
<section id="login-page" class="auth">
    <form id="login" @submit=${onSubmit}>

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>
`

export async function loginPage(ctx) {
    ctx.render(loginTemplete(onSubmit));


    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');


        if (!email || !password) {
            return alert('All fields must be filled !');
        }

        await login(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/index.html');
    }
}