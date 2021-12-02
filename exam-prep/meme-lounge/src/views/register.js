import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/api.js";
import { notify } from "./notification.js";


const registerTemplete = (onSubmit) => html`
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplete(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let username = formData.get("username");
        let email = formData.get("email");
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');
        let gender = formData.get('gender');

        if (!email || !password || !username || !gender) {
            return notify('All fields must be filled');
        }

        if (repeatPass != password) {
            return notify('Password and Repeat Password fields must be the same');
        }

        await register(username, email, password, gender);
        ctx.setUserNav();
        ctx.page.redirect('/allMemes');

    }
}