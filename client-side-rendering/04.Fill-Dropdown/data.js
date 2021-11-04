 export async function postData(data){
    await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(data)
  });
}

 export async function getData(){
 let response =  await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
 let data = await response.json();

 let arr = Object.values(data).map(optionTemplete);

  return arr;
}
