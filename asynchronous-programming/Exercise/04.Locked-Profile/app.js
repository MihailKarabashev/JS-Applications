function lockedProfile() {
  let main = document.querySelector('main');
  main.innerHTML = '';
  ( async () =>  {
    let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    let data = await response.json();
    Object.values(data).forEach(profile => {
        let profileDiv = createProfile(profile.age,profile.email,profile.username,profile._id);
         main.appendChild(profileDiv);
    });

  })();

  function createProfile(age,email,username,id){
     
    let div = document.createElement('div');
    div.classList.add('profile');

    let img = document.createElement('img');
    img.src = "./iconProfile2.png";
    img.classList.add("userIcon");
    div.appendChild(img);

    let labelLock = document.createElement('label');
    labelLock.textContent = 'Lock';
    div.appendChild(labelLock);

    let inputLock = document.createElement('input');
    inputLock.type = 'radio';
    inputLock.name = `user${id}Locked`;
    inputLock.value = 'lock';
    inputLock.checked = true;
    div.appendChild(inputLock);


    let labelUnlock = document.createElement('label');
    labelUnlock.textContent = 'Unlock';
    div.appendChild(labelUnlock);

    let inputUnlock = document.createElement('input');
    inputUnlock.type = 'radio';
    inputUnlock.name = `user${id}Locked`;
    inputUnlock.value = 'unlock';
    div.appendChild(inputUnlock);

    let hr = document.createElement('hr');
    div.appendChild(hr);

    let labelName = document.createElement('label');
    labelName.textContent = 'Username';
    div.appendChild(labelName);

    let inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.name = `user${id}Username`;
    inputUsername.value = username;
    inputUsername.disabled = true;
    inputUsername.readOnly =  true;
    div.appendChild(inputUsername);
    
    let hiddenDiv = document.createElement('div');
    hiddenDiv.id = `user${id}HiddenFields`;

    let hrHiddenDiv = document.createElement('hr');
    hiddenDiv.appendChild(hrHiddenDiv);

    let emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';
    hiddenDiv.appendChild(emailLabel);

    let inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = `user${id}Email`;
    inputEmail.value = email;
    inputEmail.disabled = true;
    inputEmail.readOnly = true;
    hiddenDiv.appendChild(inputEmail);

    let ageLabel = document.createElement('label');
    ageLabel.textContent = 'Age';
    hiddenDiv.appendChild(ageLabel);

    let inputAge = document.createElement('input');
    inputAge.type = 'email';
    inputAge.name = `user${id}Age`;
    inputAge.value = age;
    inputAge.disabled = true;
    inputAge.readOnly = true;
    hiddenDiv.appendChild(inputAge);

    div.appendChild(hiddenDiv);

    let button = document.createElement('button');
    button.textContent = 'Show More';
    button.addEventListener('click', showMore);

    div.appendChild(button);

    return div;
  }

  function showMore(e){
    let profile = e.target.parentElement;
    let hiddenDiv = e.target.previousElementSibling;
    let showMoreButton = e.target;
    let radioButton = profile.querySelector('input[type=radio] : checked');

    if (radioButton.value !== 'unlock') {
      return;
    }

    showMoreButton = showMoreButton.textContent === 'Show More' 
    ? 'Hide it'
    : 'Show More';

    hiddenDiv.style.display = hiddenDiv.style.display === 'block' ? 'none' : 'block';

  }

}


/*
  <div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="" disabled readonly />
				<div id="user1HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user1Age" value="" disabled readonly />
				</div>
				<button>Show more</button>
			</div>
            ?*/
