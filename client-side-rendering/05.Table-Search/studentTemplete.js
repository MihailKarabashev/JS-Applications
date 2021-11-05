import {html} from 'https://unpkg.com/lit-html?module';
import {ifDefined} from './../node_modules/lit-html/directives/if-defined.js'

 let studentTemplete = (student) => html`
     <tr class=${ifDefined(student.class)}>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
    </tr>
`;

export let stundetsTemplete = (students) => html`${students.map(studentTemplete)}`;