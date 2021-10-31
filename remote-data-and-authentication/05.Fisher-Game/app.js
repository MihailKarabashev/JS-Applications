function solve(){
    document.querySelector('button.load').addEventListener('click', loadAllCatches);
    let button = document.querySelector('#addForm > .add');
    button.disabled = sessionStorage.getItem('authToken') === null;

   button.addEventListener('click', createCatch);

   document.querySelector('#catches').addEventListener('click', changeData);
}

solve();

async function changeData(e){
   if (e.target.className === 'update' && sessionStorage.getItem('authToken') !== null) {
       
   }else if(e.target.className === 'delete' && sessionStorage.getItem('authToken') !== null){
      
   }
}

async function createCatch(){
     let inputs = document.querySelectorAll('#addForm > input');
     let obj = {
         angler : inputs[0].value,
         weight : Number(inputs[1].value),
         species : inputs[2].value,
         location : inputs[3].value,
         bait : inputs[4].value,
         captureTime : Number(inputs[5].value),
     }

     let token = sessionStorage.getItem('authToken');

     await request('http://localhost:3030/data/catches', {
        method: 'POST',
        headers : {'Content-Type' : 'application/json' , 'X-Authorization' : token},
        body : JSON.stringify(obj),
    });

    await loadAllCatches();

    
}


async function loadAllCatches(){
   let div = document.querySelector('#catches');
   div.innerHTML = '';

    let data = await request('http://localhost:3030/data/catches');

    data.forEach(xCatch => {
          let catchComponent = createCatchComponent(xCatch);
          div.appendChild(catchComponent);
    })
}


function createCatchComponent(xCatch){
  let divElement = document.createElement('div');
  divElement.classList.add('catch');

  let angler = document.createElement('label');
  angler.textContent = "Angler";

  let anglerInput = createInput('text','angler',xCatch.angler);

  divElement.appendChild(angler);
  divElement.appendChild(anglerInput);

  let hrElemnet = document.createElement('hr');
  divElement.appendChild(hrElemnet);


 let weight = document.createElement('label');
 weight.textContent = 'Weight';

 let weightInput = createInput('number', 'weight', xCatch.weight);

 divElement.appendChild(weight);
 divElement.appendChild(weightInput);

 divElement.appendChild(hrElemnet);

 let species = document.createElement('label');
 species.textContent = 'Species';

 let speciesInput = createInput('text', 'species', xCatch.species);
 divElement.appendChild(species);
 divElement.appendChild(speciesInput);

 divElement.appendChild(hrElemnet);

 let location = document.createElement('label');
 location.textContent = 'Location';

 let locationInput = createInput('text', 'location', xCatch.location);
 divElement.appendChild(location);
 divElement.appendChild(locationInput);

 divElement.appendChild(hrElemnet);

 let bait = document.createElement('label');
 bait.textContent = 'Bait';

 let baitInput = createInput('text', 'bait',xCatch.bait);
 divElement.appendChild(bait);
 divElement.appendChild(baitInput);

 divElement.appendChild(hrElemnet);


 let captureTime = document.createElement('label');
 captureTime.textContent = 'Capture Time';

 let captureTimeInput = createInput('number', 'captureTime', xCatch.captureTime);
 
 divElement.appendChild(captureTime);
 divElement.appendChild(captureTimeInput);

 divElement.appendChild(hrElemnet);

 let buttonUpdate = document.createElement('button');
 buttonUpdate.textContent = 'Update';
 buttonUpdate.setAttribute('disabled', true);
 buttonUpdate.classList.add('update');

 divElement.appendChild(buttonUpdate);

 let buttonDelete = document.createElement('button');
 buttonDelete.textContent = 'Delete';
 buttonDelete.setAttribute('disabled',true);
 buttonDelete.classList.add('delete');

 divElement.appendChild(buttonDelete);

 return divElement;


}

function createInput(type,className,value){
  let input = document.createElement('input');
  input.value = value;
  input.classList.add(className);
  input.type = type;

  return input;
}

async function request(url,option){
    let response = await fetch(url,option);
    
    if (!response.ok) {
        let error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    let data = await response.json();

    return data;
}
