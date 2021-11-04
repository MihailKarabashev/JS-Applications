import {html} from 'https://unpkg.com/lit-html?module';

export let templateCard = (card) => html`
     <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${card.name}</h2>
                <button @click = ${showDetails} class="detailsBtn">Details</button>
                <div class="details" id="${card.id}">
                    <p>Phone number: ${card.phoneNumber}</p>
                    <p>Email: ${card.email}</p>
                </div>
            </div>
        </div>
`;


function showDetails(e){
   let hiddenDiv = e.target.nextElementSibling;
   
   if (hiddenDiv.classList.contains('details')) {
      hiddenDiv.classList.remove("details");
   }else{
       hiddenDiv.classList.add("details");
   }

}