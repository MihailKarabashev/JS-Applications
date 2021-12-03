import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js';


const registerTemplete = (onSubmit) => html`
<section id="register-page" class="content auth">
    <form id="register" @submit=${onSubmit}>
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplete(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let confirmPass = formData.get('confirm-password');

        if (!email || !password || !confirmPass) {
            return alert('All fields must be filled !');
        }

        if (password != confirmPass) {
            return alert('Password and Confirm Pass fields must be the same!');
        }

        await register(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/index.html');
    }
}