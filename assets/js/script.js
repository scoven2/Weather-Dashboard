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
};

//based on unit 4 activity 23
//localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
//renderMessage();
let saveSearch = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
};

//based on unit 6 activity 24
// var getFeaturedRepos = function (language) {
//     var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//     fetch(apiUrl).then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayRepos(data.items, language);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     });
//   };
let getWeather = function(city) {
  let apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e8b45019544b39375a45ac056b5a30ee'
  fetch(apiURL)
    .then(function(response) {
      response.json()
        .then(function(data) {
          displayWeather(data, city);
        })
    })
};

