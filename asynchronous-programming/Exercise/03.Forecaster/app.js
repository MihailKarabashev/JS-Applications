function attachEvents() {
  let url = "http://localhost:3030/jsonstore/forecaster/locations";

  document
    .querySelector("#submit")
    .addEventListener("click", () => getWeatherInfo(url));
}

async function getWeatherInfo(url) {
  let inputLocation = document.querySelector("#location");
  let forceCastDiv = document.querySelector("#forecast");

  let current = document.querySelector("#current");
  let upcoming = document.querySelector("#upcoming");

  let symbols = {
    sunny: "☀",
    "partly sunny": "⛅",
    overcast: "☁",
    rain: "☂",
  };

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    let data = await response.json();

    let objectLocation = data.find((x) => x.name === inputLocation.value);

    if (!objectLocation) {
      throw new Error();
    }

    forceCastDiv.removeAttribute("style");

    let todayWeather = await getWeatherForToday(objectLocation.code, symbols);

    let threeDaysWeather = await getWeatherForUpcomingDays(
      objectLocation.code,
      symbols
    );

    current.appendChild(todayWeather);
    upcoming.appendChild(threeDaysWeather);

    inputLocation.value = "";
  } catch (error) {
    console.error(error);
  }
}

async function getWeatherForToday(code, symbols) {
  try {
    let response = await fetch(
      `http://localhost:3030/jsonstore/forecaster/today/${code}`
    );

    if (!response.ok) {
      throw new Error();
    }
    let data = await response.json();

    let divElement = e(
      "div",
      { className: "forecasts" },
      e(
        "span",
        { className: "condition symbol" },
        symbols[data.forecast.condition.toLowerCase()]
      ),
      e(
        "span",
        { className: "condition" },
        e("span", { className: "forecast-data" }, data.name),
        e(
          "span",
          { className: "forecast-data" },
          data.forecast.low + "°/" + data.forecast.high + "°"
        ),
        e("span", { className: "forecast-data" }, data.forecast.condition)
      )
    );

    return divElement;
  } catch (error) {
    console.error(error);
  }
}

async function getWeatherForUpcomingDays(code, symbols) {
  let response = await fetch(
    `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
  );
  let data = await response.json();

  let div = document.createElement("div");
  div.classList.add("forecast-info");

  data.forecast.forEach((x) => {
    let spanUpcoming = document.createElement("span");
    spanUpcoming.classList.add("upcoming");

    let spanSymbol = document.createElement("span");
    spanSymbol.classList.add("forecast-data");
    spanSymbol.textContent = symbols[x.condition.toLowerCase()];

    let spanDegrees = document.createElement("span");
    spanDegrees.classList.add("forecast-data");
    spanDegrees.textContent = `${x.low}°/${x.high}°`;

    let spanMood = document.createElement("span");
    spanMood.classList.add("forecast-data");
    spanMood.textContent = x.condition;

    spanUpcoming.appendChild(spanSymbol);
    spanUpcoming.appendChild(spanDegrees);
    spanUpcoming.appendChild(spanMood);

    div.appendChild(spanUpcoming);
  });

  return div;
}

function e(type, attributes, ...content) {
  const result = document.createElement(type);

  for (let [attr, value] of Object.entries(attributes || {})) {
    if (attr.substring(0, 2) == "on") {
      result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
    } else {
      result[attr] = value;
    }
  }

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach((e) => {
    if (typeof e == "string" || typeof e == "number") {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });

  return result;
}

attachEvents();
