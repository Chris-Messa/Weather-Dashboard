const APIKey = "b4b306d022e640a29cb62888f869d314";
const cityNameEl = document.querySelector('#city-name')

const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=${APIKey}`;
// const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon={lon}&appid=${APIKey}`;
const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=chicago&appid=${APIKey}`
let latitude = ""
let longitude = "";
function getLat() {
    return fetch(geoCodeURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        return data[0].lat;
    });
}

function getLong() {
    return fetch(geoCodeURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        return data[0].lon;
    });
}
function getFiveDayURL() {
    return Promise.all([getLat(), getLong()])
      .then(function (values) {
        latitude = values[0];
        longitude = values[1];
        const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
        fetch(fiveDayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityNameEl.textContent = data.city.name
        })
      });
    }

getFiveDayURL()

$(function() {

});
