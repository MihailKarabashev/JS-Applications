document.querySelector('#register-form').addEventListener('submit', userRegister);
document.querySelector('#login-form').addEventListener('submit', userLogin);


async function userRegister(e){
  e.preventDefault();
    let formData = new FormData(e.target);
    
    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('rePass');
    console.log(email, password);

    if ((!email || !password) || (password !== rePassword)) {
        return;
    }

    let data = await request('http://localhost:3030/users/register', {
     method: 'POST',
     headers : {'Content-Type' : 'application/json'},
     body : JSON.stringify({email,password})
   });
    
   
    sessionStorage.setItem('authToken', data.accessToken);
    window.location.assign('./index.html');
}

async function userLogin(){

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