//Variables
const cityInput = document.querySelector("#cityInput");
const submitBtn = document.querySelector("#submit");
const historyCol = document.querySelector("#btnHistory");
let searchHistory = [];

const dateEl = document.querySelector("#currentDate");
const cityEl = document.querySelector("#cityName");
const iconEl = document.querySelector("#weatherIcon");
const tempEl = document.querySelector("#temp");
const windEl = document.querySelector("#wind");
const humidEl = document.querySelector("#humidity");
const uvEl = document.querySelector("#uv");

const day1 = document.querySelector("#card1");
const day2 = document.querySelector("#card2");
const day3 = document.querySelector("#card3");
const day4 = document.querySelector("#card4");
const day5 = document.querySelector("#card5");
//Functions
//Parse Date
const parseDate = function (timestamp) {
  var a = new Date(timestamp * 1000);

  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var time = month + "/" + date + "/" + year;
  return time;
};

//Add buttons to the History div

const createBtn = function (name) {
  if (searchHistory.includes(name)) {
    let histBtn = document.createElement("BUTTON");
    histBtn.setAttribute("type", "button");
    histBtn.setAttribute("class", "btn btn-secondary w-100 my-2");
    histBtn.textContent = name;
    histBtn.setAttribute("id", name);
    historyCol.appendChild(histBtn);
  }
};

const createCard = async function (dailyforcast, card) {
  try {
    while (card.hasChildNodes()) {
      card.removeChild(card.firstChild);
    }
    let date = document.createElement("p");
    let icon = document.createElement("img");
    let temp = document.createElement("p");
    let wind = document.createElement("p");
    let humidity = document.createElement("p");
    date.innerHTML = "<h4>" + parseDate(dailyforcast.dt) + "</h4>";
    icon.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        dailyforcast.weather[0].icon +
        "@2x.png"
    );
    temp.textContent = "Temp: " + dailyforcast.temp.max;
    wind.textContent = "Wind: " + dailyforcast.wind_speed;
    humidity.textContent = "Humidity: " + dailyforcast.humidity;
    card.appendChild(date);
    card.appendChild(icon);
    card.appendChild(temp);
    card.appendChild(wind);
    card.appendChild(humidity);
  } catch (error) {
    console.log(error);
  }
};
//Add search term to local storage
const cityFormatter = function (string) {
  let firstchar = string.charAt(0);
  let upChar = firstchar.toUpperCase();
  string = string.replace(firstchar, upChar);
  return string;
};

const addHist = function (string) {
  index = searchHistory.length;
  //   console.log(index);
  string = cityFormatter(string);
  if (!searchHistory.includes(string)) {
    console.log("It's a go");
    searchHistory[index] = string.trim();
    window.localStorage.setItem("history", JSON.stringify(searchHistory));
    createBtn(string);
  }

  //   console.log(searchHistory);
};

//read from local storage

const loadHist = function () {
  let localHistory = JSON.parse(localStorage.getItem("history"));
  //   console.log(localHistory);
  //   console.log(searchHistory);
  //populate fields
  if (localHistory) {
    searchHistory = localHistory;
    // console.log(searchHistory);
    for (i = 0; i < searchHistory.length; i++) {
      createBtn(searchHistory[i]);
    }
  }
};
//get coordinates of city
const getCoord = async function (city) {
  fetch(
    "https://www.mapquestapi.com/geocoding/v1/address?key=vNG3wlvynBldbZXBB1ct6CZGK1y1nhBf&maxResults=1&location=" +
      city
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let lat = data.results[0].locations[0].latLng.lat;
      let lng = data.results[0].locations[0].latLng.lng;
      let cityName = data.results[0].locations[0].adminArea5;
      let locationData = [lat, lng, cityName];
      console.log(locationData);
      return locationData;
    });
};

//populate current weather
const currentWeather = function (data) {
  let currentTemp = data.current.temp;
  let currentWind = data.current.wind_speed;
  let currentHumidity = data.current.humidity;
  let currentUV = data.current.uvi;
  let currentDate = parseDate(data.current.dt);
  let currentIcon = data.current.weather[0].icon;
  iconEl.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
  );
  tempEl.textContent = currentTemp;
  windEl.textContent = currentWind;
  humidEl.textContent = currentHumidity;
  uvEl.textContent = currentUV;
  dateEl.textContent = currentDate;
};
const forcast = async function (data) {
  try {
    let dailyforcast = await data.daily;
    // console.log(dailyforcast);
    await createCard(dailyforcast[0], day1);
    await createCard(dailyforcast[1], day2);
    await createCard(dailyforcast[2], day3);
    await createCard(dailyforcast[3], day4);
    await createCard(dailyforcast[4], day5);
  } catch (error) {
    console.log(error);
  }
};
//set default to austin
const defaultCity = async function () {
  await fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=30.264979&lon=-97.746598&appid=573f2c5e966ec3f3c6f537b660a3b8c5&exclude=hourly,minutely&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      currentWeather(data);
      cityEl.textContent = "Austin";
      forcast(data);
      //populate weather sections
    });
};

const City = async function (cityQuery) {
  fetch(
    "https://www.mapquestapi.com/geocoding/v1/address?key=vNG3wlvynBldbZXBB1ct6CZGK1y1nhBf&maxResults=1&location=" +
      cityQuery
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let lat = data.results[0].locations[0].latLng.lat;
      let lng = data.results[0].locations[0].latLng.lng;
      let cityName = data.results[0].locations[0].adminArea5;
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lng +
          "&appid=573f2c5e966ec3f3c6f537b660a3b8c5&exclude=hourly,minutely&units=imperial"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          currentWeather(data);
          cityEl.textContent = cityName;
          forcast(data);
          //populate weather sections
        });
    });
};

//get form input

//Event Listeners
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let cityQuery = cityInput.value;
  //   console.log(cityQuery);
  //add to history
  //   getCoord(cityQuery);
  if (cityQuery) {
    console.log(cityQuery);
    City(cityQuery);
    addHist(cityQuery);
  }
  //   createBtn(cityQuery);
});

historyCol.addEventListener("click", (e) => {
  e.preventDefault();
  let city = e.target.textContent;
  City(city);
  //   console.log(city);
});
loadHist();
defaultCity();

//fetch info from api
//generate content from info
//check clicks on history and re fetch
