function solve() {
  let url = `http://localhost:3030/jsonstore/bus/schedule`;
  let arriveBtn = document.querySelector("#arrive");
  let departBtn = document.querySelector("#depart");
  let busInfo = document.querySelector("#info > span");
  let currentStop = "";

  fetch(url)
    .then((x) => x.json())
    .then((response) => {
      let dataArray = Object.entries(response);
      console.log(dataArray);

      function depart() {
        departBtn.setAttribute("disabled", "true");
        arriveBtn.removeAttribute("disabled");

        let nextStop = dataArray.pop();
        currentStop = nextStop[1].name;
        busInfo.textContent = `Next stop ${currentStop}`;
      }

      function arrive() {
        arriveBtn.setAttribute("disabled", "true");
        departBtn.removeAttribute("disabled");

        busInfo.textContent = `Arriving at ${currentStop}`;
      }

      return {
        depart,
        arrive,
      };
    });
}

let result = solve();
