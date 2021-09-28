//based on unit 6 activity 24
// var userFormEl = document.querySelector('#user-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
// var nameInputEl = document.querySelector('#username');
// var repoContainerEl = document.querySelector('#repos-container');
// var repoSearchTerm = document.querySelector('#repo-search-term');
let cities =[];
let cityEntryEl = document.querySelector("#city");
let currentWeatherEl = document.querySelector("#current-weather");
let cityPageEl = document.querySelector("#city-page");
let forcastTitleEl = document.querySelector("#forecast");
let searchedEl = document.querySelector("#searched");
let fiveDayEl = document.querySelector("#fiveDay");
let perviousSearchEl = document.querySelector("#previous-search");

//based on unit 6 activity 24
// var formSubmitHandler = function (event) {
//     event.preventDefault();

//     var username = nameInputEl.value.trim();

//     if (username) {
//       getUserRepos(username);

//       repoContainerEl.textContent = '';
//       nameInputEl.value = '';
//     } else {
//       alert('Please enter a GitHub username');
//     }
//   };
let formSubmitHandler = function(event) {
  event.preventDefault();
  let city = cityEntryEl.value.trim();
  if (city) {
    getWeather(city);
    getFiveDay(city);
    cities({ city });
    cityEntryEl.value = "";
  } else {
    alert("Enter a city to search");
  }
  savedSearch();
  pastSearch(city);
}

//based on unit 4 activity 23
//localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
//renderMessage();
let saveSearch = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
}