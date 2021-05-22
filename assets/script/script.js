$(document).ready(function() {

    // Variables
    var cities = [];
    var currentCity;
    var now = dayjs();
    var currentDate = now.format("dddd MMMM. D, YYYY");
    var baseURL = "https://api.openweathermap.org/data/2.5/";
    var APIKey = "f4d6848eb3a488816cecbd2392d8a108";
    var units = "imperial";

    // Icon array
    var icons = [{
            code: "01",
            day: "fas fa-sun",
            night: "fas fa-moon"
        },
        {
            code: "02",
            day: "fas fa-cloud-sun",
            night: "fas fa-cloud-moon"
        },
        {
            code: "03",
            day: "fas fa-cloud",
            night: "fas fa-cloud"
        },
        {
            code: "04",
            day: "fas fa-cloud-sun",
            night: "fas fa-cloud-moon"
        },
        {
            code: "09",
            day: "fas fa-cloud-rain",
            night: "fas fa-cloud-rain"
        },
        {
            code: "10",
            day: "fas fa-cloud-showers-heavy",
            night: "fas fa-cloud-showers-heavy"
        },
        {
            code: "11",
            day: "fas fa-bolt",
            night: "fas fa-bolt"
        },
        {
            code: "13",
            day: "fas fa-snowflake",
            night: "fas fa-snowflake"
        },
        {
            code: "50",
            day: "fas fa-smog",
            night: "fas fa-smog"
        }
    ];

    // start up 
    init();

    function init() {

        // show date
        $("#today").text(currentDate);

        //search history visibility conditions
        if (window.innerWidth >= 578) {
            $("#search-history").addClass("show");
            $("#collapse-search-history").hide();
        }

        //display cities in local storage
        getSearchHistory();

        //if nothing in local storage load Minneapolis, or last searched city
        if (cities.length === 0) {
            getWeather("Minneapolis");
        } else {
            var lastCityIndex = cities.length - 1;
            getWeather(cities[lastCityIndex]);
            $.each(cities, function(index, city) {
                displayCity(city);
            });
        }
    }

    // current and upcoming 5 day forcast from API
    function getWeather(city) {
        var responseData = {};

        // Current weather
        $.ajax({
            url: baseURL + "weather",
            method: "GET",
            data: {
                q: city,
                units: units,
                appid: APIKey,
            }
        }).then(function(response) {
            responseData.current = response;

            // coordinates from responsed pulls UV index data
            var coordinates = {
                lat: responseData.current.coord.lat,
                lon: responseData.current.coord.lon
            }

            getUVindex(coordinates);
            displayCurrentWeather(responseData);
        });

        // 5 day forcast
        $.ajax({
            url: baseURL + "forcast",
            method: "GET",
            data: {
                q: city,
                units: units,
                appid: APIKey,
            }
        }).then(function(response) {
            responseData.current = response;
            displayForecast(responseData);
        });
    }

    // pull UV index using lat and lon
    function getUVindex(coordinates) {
        $.ajax({
            url: baseURL + "uvi",
            method: "GET",
            data: {
                lat: coordinates.lat,
                lon: coordinates.lon,
                appid: APIKey,
            }
        }).then(function(response) {
            displayUV(response);
        });
    }

    // Font Awesome icons
    function replaceIcon(iconCode) {
        var number = iconCode.slice(0, 2);
        var dayOrNight = iconCode.slice(2);
        var currentHour = dayjs().hour();

        //pull icon
        var index = icons.findIndex(function(icon, index) {
            return icon.code === number;
        });

        //use day or night icon
        if (currentHour >= 06 && currentHour < 18) {
            return icons[index].day;
        } else {
            return icons[index].night;
        }
    }
});