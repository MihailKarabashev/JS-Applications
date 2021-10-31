document.querySelector('#loadBooks').addEventListener('click', loadBooks);
document.querySelector('form').addEventListener('submit', createBook);


async function loadBooks(){
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');

    if (!response.ok) {
        alert('Something get wrong !');
    }
    let data = await response.json();
    let tbody = document.querySelector('table > tbody');
    tbody.innerHTML = '';   

    Object.entries(data).forEach(book =>  {
        let trElement = generateSingleBook(book[0],book[1].author, book[1].title);
        tbody.appendChild(trElement);
    });

}

function generateSingleBook(id,author, title){
    let trElement = document.createElement('tr');

    let tdAuthorElement = document.createElement('td');
    tdAuthorElement.textContent = author;

    let tdTitleElement = document.createElement('td');
    tdTitleElement.textContent = title;

    let tdButtons = document.createElement('td');

    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', editBook);
    
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteBook);
    
    tdButtons.appendChild(editBtn);
    tdButtons.appendChild(deleteBtn);

    trElement.appendChild(tdTitleElement);
    trElement.appendChild(tdAuthorElement);
    trElement.appendChild(tdButtons);

    return trElement;

    async function editBook(e){
      let table = e.target.closest('table');
      let body = table.parentElement;
 
      let inputs = body.querySelectorAll('input[type=text]');
    
      inputs[0].value = tdTitleElement.textContent;
      inputs[1].value = tdAuthorElement.textContent;


      let submitBtn =inputs[1].nextElementSibling;
      submitBtn.addEventListener('click', () => editBookDetails(e, title,author, id));

    }

    async function deleteBook(){
        let response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id ,{
            method : 'DELETE',
            headers : {'Content-Type' : 'application/json'},
        });

        if (!response.ok) {
            alert(await response.text());
        }

        trElement.remove();
    }
}


async function editBookDetails(title,author, id){
    // await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
    //   method : 'PUT',
    //   headers : {'Content-Type' : 'application/json'},
    //   body :JSON.stringify({author,title})
    // });
     
}

async function createBook(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let title = formData.get('title');
    let author = formData.get('author');

    if (!title || !author) {
        return;
    }

    let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({author, title}),
    });

    if (!response.ok) {
        alert(await response.text());
    }

    e.target.reset();

    await loadBooks();

}