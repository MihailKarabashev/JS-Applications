const element = document.querySelector('#errorBox');
let spanOutput = document.querySelector('span');


export function notify(msg) {
    spanOutput.textContent = msg;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);

}
