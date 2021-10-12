function getInfo() {
  let busId = document.querySelector("#stopId");
  let divStopName = document.querySelector("#stopName");
  let ulElement = document.querySelector("#buses");
  let url = `http://localhost:3030/jsonstore/bus/businfo/${busId.value}`;

  getBusInfo();

  async function getBusInfo() {
    try {
      let response = await fetch(url);
      let data = await response.json();
      let buses = data.buses;

      divStopName.textContent = data.name;

      for (const key in buses) {
        let liElement = document.createElement("li");
        liElement.textContent = `Bus ${key} arrives in ${buses[key]}`;
        ulElement.appendChild(liElement);
      }
    } catch (error) {
      divStopName.textContent = "Error";
    }
  }

  busId.value = "";
  ulElement.textContent = "";
}
