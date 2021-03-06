//VARIABLES based on unit 6 activity 24
// var userFormEl = document.querySelector('#user-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
// var nameInputEl = document.querySelector('#username');
// var repoContainerEl = document.querySelector('#repos-container');
// var repoSearchTerm = document.querySelector('#repo-search-term');
let cities = [];
let cityEntryEl = document.querySelector("#city");
let currentWeatherEl = document.querySelector("#current-weather");
let cityPageEl = document.querySelector("#city-page");
let forecastTitleEl = document.querySelector("#forecast");
let searchedEl = document.querySelector("#searched");
let fiveDayEl = document.querySelector("#fiveDay");
let previousSearchEl = document.querySelector("#previous-search");

//SEARCH BAR based on unit 6 activity 24
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

//SAVE TO LOCAL STORAGE based on unit 4 activity 23
//localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
//renderMessage();
let savedSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//FETCH OPENWEATHER API based on unit 6 activity 24
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
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e8b45019544b39375a45ac056b5a30ee`

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
        });
    });
};

//DISPLAY WEATHER AND ELEMENTS based on unit 6 activity 21
// var displayRepos = function (repos, searchTerm) {
//     if (repos.length === 0) {
//       repoContainerEl.textContent = 'No repositories found.';
//       return;
//     }

//     repoSearchTerm.textContent = searchTerm;

//     for (var i = 0; i < repos.length; i++) {
//       var repoName = repos[i].owner.login + '/' + repos[i].name;

//       var repoEl = document.createElement('div');
//       repoEl.classList = 'list-item flex-row justify-space-between align-center';

//       var titleEl = document.createElement('span');
//       titleEl.textContent = repoName;

//       repoEl.appendChild(titleEl);

//       var statusEl = document.createElement('span');
//       statusEl.classList = 'flex-row align-center';

//       if (repos[i].open_issues_count > 0) {
//         statusEl.innerHTML =
//           "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//       } else {
//         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//       }

//       repoEl.appendChild(statusEl);

//       repoContainerEl.appendChild(repoEl);
//     }
//   };
let displayWeather = function(weather, searchCity) {
    currentWeatherEl.textContent = "";
    searchedEl.textContent = searchCity;

    let todaysDate = document.createElement("span")
    todaysDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    searchedEl.appendChild(todaysDate);

    let weatherIcons = document.createElement("img")
    weatherIcons.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    searchedEl.appendChild(weatherIcons);

    let tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + weather.main.temp + " ??F";

    let humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " % ";

    let windEl = document.createElement("span");
    windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";

    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(humidityEl);
    currentWeatherEl.appendChild(windEl);

    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    getUV(lat, lon)
}


//UV INDEX based on unit 6 activity 21
// var getUserRepos = function (user) {
//     var apiUrl = 'https://api.github.com/users/' + user + '/repos';

//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             displayRepos(data, user);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to connect to GitHub');
//       });
//   };
let getUV = function(lat, lon) {
    let apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=844421298d794574c100e3409cee0499&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function(response) {
            response.json().then(function(data) {
                showUV(data)
            });
        });
}

//UV INDEX based on unit 6 activity 21
// var displayRepos = function (repos, searchTerm) {
//     if (repos.length === 0) {
//       repoContainerEl.textContent = 'No repositories found.';
//       return;
//     }

//     repoSearchTerm.textContent = searchTerm;

//     for (var i = 0; i < repos.length; i++) {
//       var repoName = repos[i].owner.login + '/' + repos[i].name;

//       var repoEl = document.createElement('div');
//       repoEl.classList = 'list-item flex-row justify-space-between align-center';

//       var titleEl = document.createElement('span');
//       titleEl.textContent = repoName;

//       repoEl.appendChild(titleEl);

//       var statusEl = document.createElement('span');
//       statusEl.classList = 'flex-row align-center';

//       if (repos[i].open_issues_count > 0) {
//         statusEl.innerHTML =
//           "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//       } else {
//         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//       }

//       repoEl.appendChild(statusEl);

//       repoContainerEl.appendChild(repoEl);
//     }
//   };
let showUV = function(index) {
    let uvEl = document.createElement("div");
    uvEl.textContent = "UV Index: "
    uvValue = document.createElement("span")
    uvValue.textContent = index.value;
    if (index.value <= 2) {
        uvValue.classList = "low"
    } else if (index.value > 2 && index.value <= 8) {
        uvValue.classList = "moderate"
    } else if (index.value > 8) {
        uvValue.classList = "high"
    };
    uvEl.appendChild(uvValue);
    currentWeatherEl.appendChild(uvEl);
};

//FETCH OPENWEATHER API 5 DAY WEATHER based on unit 6 activity 21
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
let getFiveDay = function(city) {
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=844421298d794574c100e3409cee0499`
    fetch(apiURL)
        .then(function(response) {
            response.json().then(function(data) {
                displayFiveDay(data);
            });
        });
};

//DISPLAY 5 DAY WEATHER, AND ELEMENTS based on unit 6 activity 21
// var displayRepos = function (repos, searchTerm) {
//     if (repos.length === 0) {
//       repoContainerEl.textContent = 'No repositories found.';
//       return;
//     }

//     repoSearchTerm.textContent = searchTerm;

//     for (var i = 0; i < repos.length; i++) {
//       var repoName = repos[i].owner.login + '/' + repos[i].name;

//       var repoEl = document.createElement('div');
//       repoEl.classList = 'list-item flex-row justify-space-between align-center';

//       var titleEl = document.createElement('span');
//       titleEl.textContent = repoName;

//       repoEl.appendChild(titleEl);

//       var statusEl = document.createElement('span');
//       statusEl.classList = 'flex-row align-center';

//       if (repos[i].open_issues_count > 0) {
//         statusEl.innerHTML =
//           "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//       } else {
//         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//       }

//       repoEl.appendChild(statusEl);

//       repoContainerEl.appendChild(repoEl);
//     }
//   };
let displayFiveDay = function(weather) {
    fiveDayEl.textContent = ""
    forecastTitleEl.textContent = "5-Day Forecast:"

    let forecast = weather.list;
    for (let i = 5; i < forecast.length; i = i + 8) {
        let dailyForecast = forecast[i];

        let weatherEl = document.createElement("div");

        let weatherDate = document.createElement("h5")
        weatherDate.textContent = moment.unix(dailyForecast.dt)
            .format("MMM D, YYY");
        weatherEl.appendChild(weatherDate);

        let weatherIcons = document.createElement("img")
        weatherIcons.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);
        weatherEl.appendChild(weatherIcons)

        let temperatureEl = document.createElement("span");
        temperatureEl.textContent = dailyForecast.main.temp + " ??F ";
        weatherEl.appendChild(temperatureEl);

        let currentHumidityEl = document.createElement("span");
        currentHumidityEl.textContent = dailyForecast.main.humidity + " %";
        weatherEl.appendChild(currentHumidityEl);

        fiveDayEl.appendChild(weatherEl);
    }
}

// based on unit 6 activity 21
// userFormEl.addEventListener('submit', formSubmitHandler);
// languageButtonsEl.addEventListener('click', buttonClickHandler);
cityPageEl.addEventListener("submit", formSubmitHandler);
previousSearchEl.addEventListener("click", pastSearchHandler);