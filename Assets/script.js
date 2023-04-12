const APIKey = "b4b306d022e640a29cb62888f869d314";
const cityNameEl = document.querySelector('#city-name');
const cityTempEl = document.querySelector('#current-temperature');
const cityWindEl = document.querySelector('#current-wind');
const cityHumidityEl = document.querySelector('#current-humidity');
const currentIconEl = document.querySelector('#current-icon');
const searchButton = document.querySelector('#search-btn');
const searchInputEl = document.querySelector('#search-input');


searchButton.addEventListener('click', function () {
    let searchedCity = searchInputEl.value.toLowerCase().trim();
    
    queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${APIKey}&units=imperial`;

getCoords();
});


function getCoords() {
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        cityNameEl.textContent = `${data.name}`;
        cityTempEl.textContent = `Temp: ${data.main.temp}`;
        cityWindEl.textContent = `Wind: ${data.wind.speed} MPH`;
        cityHumidityEl.textContent = `Humidity: ${data.main.humidity}`;
        const imageURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        fetch(imageURL) 
        .then((response) => {
        return response;
    })
    .then((data) => {
        document.querySelector('#current-icon').src = data.url;
    })
    getFiveDayURL(data.coord.lat, data.coord.lon);
});
}
function getFiveDayURL(latitude, longitude) {
console.log(latitude, longitude);
const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`;
console.log(fiveDayURL);
fetch(fiveDayURL)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
})
}