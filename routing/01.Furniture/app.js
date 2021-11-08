import {render} from 'https://unpkg.com/lit-html?module';
import page from './node_modules/page/page.mjs';

import {createPage} from './views/create.js'
import {dashboardPage} from './views/dashboard.js'
import {detailsPage} from './views/details.js'
import {editPage} from './views/edit.js'
import {loginPage} from './views/login.js'
import {registerPage} from './views/register.js'
import {myFurniture} from './views/myFurniture.js'

let container = document.querySelector('.container');


page('/index',decorateContext, dashboardPage);
page('/',decorateContext, dashboardPage);
page('/create',decorateContext, createPage);
page('/details/:id',decorateContext, detailsPage);  
page('/edit/:id', decorateContext, editPage);
page('/myFurniture',decorateContext, myFurniture);
page('/login',decorateContext, loginPage);
page('/register',decorateContext, registerPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (templete) => render(templete,container);
    next();
}


