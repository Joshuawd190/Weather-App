//Variables
const cityInput = document.querySelector("#cityInput");
const submitBtn = document.querySelector("#submit");
const historyCol = document.querySelector("#btnHistory");
let searchHistory = [];

//Functions

//Load Local Storage

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
  if (localHistory) {
    searchHistory = localHistory;
    // console.log(searchHistory);
    for (i = 0; i < searchHistory.length; i++) {
      createBtn(searchHistory[i]);
    }
  }
};
//populate fields
//set default to austin
//get form input

//Event Listeners
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let cityQuery = cityInput.value;
  //   console.log(cityQuery);
  //add to history
  addHist(cityQuery);
  createBtn(cityQuery);
});

historyCol.addEventListener("click", (e) => {
  e.preventDefault();
  let city = e.target.textContent;
  //   console.log(city);
});
loadHist();
//fetch info from api
//generate content from info
//check clicks on history and re fetch
