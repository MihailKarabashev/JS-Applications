import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";



const registerTemplete = (onSubmit) => html`
<section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`


export async function registerPage(ctx) {
    ctx.render(registerTemplete(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get("email");
        let password = formData.get('password');
        let repeatPass = formData.get('confirm-pass');


        if (!email || !password) {
            return alert('All fields must be filled');
        }

        if (repeatPass != password) {
            return alert('Password and Repeat Password fields must be the same');
        }

        await register(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/index.html');

    }
}