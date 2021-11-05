import {render} from 'https://unpkg.com/lit-html?module';
import {stundetsTemplete} from './studentTemplete.js';


let tbody = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);
let students = [];

loadStundents();

async function loadStundents(){
   let response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   let data = await response.json();

   students = Object.values(data).map(x=> ({
      firstName : x.firstName,
      lastName : x.lastName,
      email : x.email,
      course : x.course
   }));

  render(stundetsTemplete(students),tbody);
}

function onClick(){
 
   let input = document.querySelector('#searchField');
   let inputText = input.value.toLowerCase();

   let studentCopy = students.map(x=> Object.assign({}, x));

   let searchedStudents = studentCopy.filter(x=> Object.values(x).some(st=> st.toLowerCase().includes(inputText)));

   
   searchedStudents.forEach(x=> x.class = 'select');

   input.value = '';

   render(stundetsTemplete(studentCopy),tbody);
}