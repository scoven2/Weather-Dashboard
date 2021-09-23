$(document).ready(function() {

  // Variables
  var cities = [];
  var currentDay= $("#current-day");
  var presentCities = $("#presentCities");
  var now = moment().format("dddd");
  var fullDate = moment().format("MMMM Do YYYY ");
  $("#weatherDashboard").append(fullDate);
  var queryCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";
  var queryFiveDay = "https://api.openweathermap.org/data/2.5/forcast?q=";
  var UV = "https://api.openweathermap.org/data/2.5/uvi?"
  var imgApi = "https://openweathermap.org/img/w/";
  var appID = "&appid=f4d6848eb3a488816cecbd2392d8a108";

  init();

  function init() {
    if (localStorage.getItem("cities")) {
      cities = JSON.parse(localStorage.getItem("cities"));
      for (city of cities) {
        showCity(city);
      }
    }
    getCurrent("Plymouth");
  }

  function getCurrent(city) {
    if (city !== "") {
      $.ajax({
        url: queryCurrent + city + "&units=imperial" + appID,
        type: "GET",
        dataType: "jsonp",
      }).then(function(data) {
        $("#error").html("");
        currentDay.html("");
        currentDay.append("<h2>" + city + "</h2>");
        currentDay.append("<p>" + city + "</p>");
        var show = showData(data);
        currentDay.append(show);
        getFiveDay(city)
        if (!isDuplicate(city)) {
          showCity(city);
          save(city);
        }
      }).fail(function () {
        $("#error").html("No City Found");
      });
    }else {
      $("#error").html("Must enter city");
    }
  }
  function showData(data) {
    UVIndex(data);
    return (
      "<h2>" + data.weather[0].main + "</h2>" + "<img src=" + imgApi + data.weather[0].icon + ".png alt=" + data.weather.value + 'width="50" height="50"></img>' + '<p class="humidity"> Humidity: ' + data.main.humidity + "%</p>" + '<p class="temperature">Temperature: ' + Math.trunc(data.main.temp_max) + "&deg;F</p>" + '<p class="wind-speed">Wind Speed: ' + data.wind.speed + " m/h</p>"
    )
  }
});