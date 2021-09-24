$(document).ready(function() {

  var cities = [];
  var currentDay= $("#current-day");
  var presentCities = $("#presentCities");
  var now = moment().format("dddd");
  var fullDate = moment().format("MMMM Do YYYY ");
  $("#weatherDashboard").append(fullDate);
  var queryCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";
  var queryFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=";
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
        currentDay.append("<p>" + now + "</p>");
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
  function UVIndex(data) {
    $.ajax({
      url: UV + appID + "@lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&cnt=" + 5,
      type: "GET",
    }).then(function(data) {
      var color = UVColor(data.value)
      currentDay.append('<p class="uv">UV Index: ' + data.value + "</p>");
      $(".uv").css("color", color)
    });
  }
  function UVColor(UV) {
    if (UV <= 2) {
      return "green"
    } else if (UV <= 5) {
      return "yellow"
    } else if (UV <= 7) {
      return "orange"
    } else if (UV <= 10) {
      return "red"
    } else {
      return "purple"
    }
  }
  function getFiveDay(city){
    if (city !== "") {
      $.ajax({
        url: queryFiveDay + city + "&units=imperial" + appID,
        type: "GET",
        dataType: "jsonp",
      }).then(function(data) {
        var showFiveDays = showFiveDay(data);
        $("#forecast .day").append(showFiveDays);
      });
    } else {
      $("error").html("Field must be filled");
    }
  }
  function showFiveDay(data) {
    var cardForecast =$("#cardsForecast")
    cardForecast.html("");
    for (let i = 0; i < 5; i++) {
      var new_date = moment().add(i, "days").format("dddd");
      let forecast = function(data) {
        return (
          '<div class="col-sm-12 col-md-6 col-lg-2">' + '<p class"date"></p>' + new_date + "<img src=" + imgApi + data.list[i * 8].weather[0].icon + ".png alt=" + data.list[i * 8].weather.description + 'width="50" height="50">' + '<p class="temperature">Temp: ' + Math.trunc(data.list[i * 8].main.temp_max) + "&nbsp;&deg;F</p>" + '<p class="humidity">Humidity: ' + data.list[i * 8].main.humidity + "%</p>" + "</div>"
        );
      };
      cardForecast.append(forecast(data));
    }
  }
  $("#btn-search").click(function() {
    var city = $("#input-city").val();
    getCurrent(city);
  });
  function showCity(city) {
    presentCities.append(
      '<button type="button" class="list-group-item list-group-item-action">' + city + "</button>"
    );
  }
  function save(city) {
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }
  function isDuplicate(city) {
    for (cityName of cities) {
      if (cityName == city) {
        return true;
      }
    }
    return false;
  }
  presentCities.click(function (event) {
    var city = event.target.textContent;
    getCurrent(city);
  });
});