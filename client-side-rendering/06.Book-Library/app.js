import {render} from 'https://unpkg.com/lit-html?module';
import {bookOverViewTemplete} from './book.js';
import {getAllData, addData, deleteData} from './api.js'

let addForm = {id : 'add-form', hasHiddenField : false , action: 'Add', buttonValue : 'Submit'};
let editForm = {id : 'edit-form', hasHiddenField : true , action: 'Edit', buttonValue : 'Save', class : 'hidden'};
let forms = [addForm,editForm ];

let books = []

render(bookOverViewTemplete([],forms), document.body);

document.querySelector('#loadBooks').addEventListener('click', loadBooks);
document.querySelector('#add-form').addEventListener('submit', createBook);
document.querySelector('#body-id').addEventListener('click', onButtonClick);



async function loadBooks(){
     let data = await getAllData();

     Object.entries(data).forEach(x=> {
       let book = {
           _id : x[0],
           author : x[1].author,
           title : x[1].title,
       };

       books.push(book);
     });

    render(bookOverViewTemplete(books, forms), document.body);
}

async function createBook(e){
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let title = formData.get('title');
  let author = formData.get('author');

  if (!title || !author) {
      return;
  }
  
  await addData({title,author});

  e.target.reset();
}

async function onButtonClick(e){

    if (e.target.classList.contains('editBtn')) {
        console.log('ff');
    }else if(e.target.classList.contains('deleteBtn')){
      console.log('ss');
    }
}

