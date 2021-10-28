window.addEventListener('load', loadStudents);
document.querySelector('form').addEventListener('submit',createStudent);

async function loadStudents(){
    let tBody = document.querySelector('#results > tbody');

    let response = await fetch('http://localhost:3030/jsonstore/collections/students');
    let data = await response.json();

    tBody.innerHTML = '';

    Object.values(data).forEach(student=> {
      let trStudentElement = createStudentTemplate(student.firstName, student.lastName,student.facultyNumber, student.grade.toFixed(2));
      tBody.appendChild(trStudentElement);
    })
}

async function createStudent(e){
 e.preventDefault();

 let formData = new FormData(e.target);

  let firstName = formData.get('firstName');
  let lastName = formData.get('lastName');
  let facultyNumber = formData.get('facultyNumber');
  let grade = Number(formData.get('grade')  );

  if (!firstName || !lastName || !facultyNumber || !grade) {
      return alert('All fields should filled !');
  }

  let response = await fetch('http://localhost:3030/jsonstore/collections/students', {
      method : "POST",
      headers: {
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify({firstName, lastName,facultyNumber,grade}),
  });

  if (!response.ok) {
      let response = await response.json();
      alert(response.message);
  }

  e.target.reset();

  await loadStudents();
}

function createStudentTemplate(firstName, lastName, facNumber, grade){
    let tr = document.createElement('tr');

    let tdFirstName = document.createElement('td');
    tdFirstName.textContent = firstName;

    let tdLastName = document.createElement('td');
    tdLastName.textContent = lastName;

    let tdFacNumber = document.createElement('td');
    tdFacNumber.textContent = facNumber;

    let tdGrade = document.createElement('td');
    tdGrade.textContent = grade;

    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdFacNumber);
    tr.appendChild(tdGrade);
 
    return tr;
}
