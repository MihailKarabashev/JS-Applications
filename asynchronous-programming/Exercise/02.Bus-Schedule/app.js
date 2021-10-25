function solve() {
  let infoBanner = document.querySelector(" #schedule > #info > span");
  let arriveBtn = document.querySelector("#arrive");
  let departBtn = document.querySelector("#depart");

  let nextStop = {
    name: "Depot",
    next: "depot",
  };

  async function depart() {
    try {
      let response = await fetch(
        "http://localhost:3030/jsonstore/bus/schedule/" + nextStop.next
      );

      if (!response.ok) {
        throw new Error();
      }

      let data = await response.json();
      nextStop.name = data.name;
      nextStop.next = data.next;

      infoBanner.textContent = `Next stop ${data.name}`;

      departBtn.setAttribute("disabled", "true");
      arriveBtn.removeAttribute("disabled");
    } catch (error) {
      infoBanner.textContent = "Error";
      departBtn.setAttribute("disabled", "true");
      arriveBtn.setAttribute("disabled", "true");
    }
  }

  function arrive() {
    arriveBtn.setAttribute("disabled", "true");
    departBtn.removeAttribute("disabled");

    infoBanner.textContent = `Arriving at ${nextStop.name}`;
  }

  return {
    depart,
    arrive,
  };
}
let result = solve();
