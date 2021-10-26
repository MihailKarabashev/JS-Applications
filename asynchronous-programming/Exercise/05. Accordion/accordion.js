window.addEventListener('load', solution);


async function solution(){
    let section = document.querySelector('#main');

    let response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    let data = await response.json();

    data.forEach(async (x) => {
        let accordion =  await createAccordion(x.title, x._id);
        section.appendChild(accordion);
    });
}

  async function createAccordion(title,id){
       let div = document.createElement('div');
       div.classList.add('accordion');

       let divHead = document.createElement('div');
       div.classList.add('head');

       let span = document.createElement('span');
       span.textContent = title;
       divHead.appendChild(span);

       let button = document.createElement('button');
       button.classList.add('button');
       button.id = id;
       button.textContent = 'More';
       button.addEventListener('click', showMore);
       divHead.appendChild(button);

       let data = await getAccordionById(id);
       console.log(data);

       let divExtra = document.createElement('div');
       divExtra.classList.add('extra');

       let pContent = document.createElement('p');
       pContent.textContent = data.content;
       
       divExtra.appendChild(pContent);

       div.appendChild(divHead);
       div.appendChild(divExtra);

       return div;
   }
   
   async function getAccordionById(id){
     let response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/'+ id);
     let data = await response.json();

     return data;
   }

   function showMore(e){
       let button = e.target;
       let divExtra = button.parentElement.nextElementSibling;

     if (button.textContent === 'More') {
        button.textContent = 'Less';
        divExtra.style.display = 'block';
    }else{
        button.textContent = 'More';
        divExtra.style.display = 'none';
    }
   }
