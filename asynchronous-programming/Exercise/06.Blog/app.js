function attachEvents() {
   document.querySelector('#btnLoadPosts').addEventListener('click',fillOptions);
   document.querySelector('#btnViewPost').addEventListener('click', getPostInfo);
   let posts = [];


   async function fillOptions(){
    let data = await getData('http://localhost:3030/jsonstore/blog/posts');

    posts = [...Object.values(data)];
   
     let selectElement = document.querySelector('#posts');
   
    Object.values(data).forEach(post => {
       let option = createOption(post);
       selectElement.appendChild(option);
    });
   }
   
   async function getPostInfo(e){
       let select = e.target.previousElementSibling;
       let id = select.options[select.selectedIndex].value;

       let post = posts.find(currPost => currPost.id === id);
   
       let postTitle = document.querySelector('#post-title');
       postTitle.textContent = post.title;

       let postBody = document.querySelector('#post-body');
       postBody.textContent = post.body;

       let comments= document.querySelector('#post-comments');
       
      let data = await getData('http://localhost:3030/jsonstore/blog/comments');
   
       Object.values(data).filter(x=> x.postId === id).forEach(currComment => {
           let comment = createComment(currComment);
           comments.appendChild(comment);
       });
   }

   async function getData(url){
    let response = await fetch(url);
    let data = await response.json();

    return data;
   }
   
   function createComment(comment){
      let liCommentElement = document.createElement('li');
      liCommentElement.id = comment.id;
      liCommentElement.textContent = comment.text;

      return liCommentElement;
   }

   function createOption(post){
       let option = document.createElement('option');
       option.value = post.id;
       option.textContent = post.title;
   
       return option;
   }
}

attachEvents();

