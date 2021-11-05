export async function getAllData(){
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');
    let data = await response.json();

    return data;
}

export async function addData(data){
   await fetch('http://localhost:3030/jsonstore/collections/books', {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(data)
  });
}

export async function deleteData(id){
    await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method : 'DELETE',
      });
}