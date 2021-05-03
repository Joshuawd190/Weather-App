//Variables
const cityInput = document.querySelector("#cityInput");
const submitBtn = document.querySelector("#submit");
const historyCol = document.querySelector("#btnHistory");
let searchHistory = [];

//Functions

//Add buttons to the History div

const createBtn = function (name) {
  let histBtn = document.createElement("BUTTON");
  histBtn.setAttribute("type", "button");
  histBtn.setAttribute("class", "btn btn-secondary w-100 my-2");
  histBtn.textContent = name;
  histBtn.setAttribute("id", name);
  historyCol.appendChild(histBtn);
};

//Add search term to local storage

const addHist = function (string) {
  index = searchHistory.length;
  //   console.log(index);
  searchHistory[index] = string;
  window.localStorage.setItem("history", JSON.stringify(searchHistory));
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
const getCoord = function (city) {
  fetch(
    "http://www.mapquestapi.com/geocoding/v1/address?key=vNG3wlvynBldbZXBB1ct6CZGK1y1nhBf&maxResults=1&location=" +
      city
  )
    .then((response) => response.json())
    .then((data) => {
      let Coords = data.results[0].locations[0].latLng;
      console.log(Coords);
    });
};

//set default to austin
const defaultCity = function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=30.264979&lon=-97.746598&appid=573f2c5e966ec3f3c6f537b660a3b8c5&exclude=hourly,minutely"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //populate weather sections
    });
};
//populate current weather
const currentWeather = function (data) {};

//get form input

//Event Listeners
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let cityQuery = cityInput.value;
  //   console.log(cityQuery);
  //add to history
  getCoord(cityQuery);
  addHist(cityQuery);
  createBtn(cityQuery);
});

historyCol.addEventListener("click", (e) => {
  e.preventDefault();
  let city = e.target.textContent;
  getCoord(city);
  //   console.log(city);
});
loadHist();
defaultCity();
//fetch info from api
//generate content from info
//check clicks on history and re fetch
