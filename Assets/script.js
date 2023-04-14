const APIKey = "b4b306d022e640a29cb62888f869d314";
const cityNameEl = document.querySelector('#city-name');
const cityTempEl = document.querySelector('#current-temperature');
const cityWindEl = document.querySelector('#current-wind');
const cityHumidityEl = document.querySelector('#current-humidity');
const currentIconEl = document.querySelector('#current-icon');
const searchButton = document.querySelector('#search-btn');
const searchInputEl = document.querySelector('#search-input');
const cityContainer = document.querySelector('#city-container');
const forecastElList = document.querySelector('#forecast-list');
cityContainer.setAttribute('style', 'display: none;')

searchButton.addEventListener('click', function () {
    cityContainer.setAttribute('style', 'display: block')
    const searchedCity = searchInputEl.value.toLowerCase().trim();
    
    queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${APIKey}&units=imperial`;

    getCoords();
});
function getCoords() {
    fetch(queryURL)
    .then((response) => {
        return response.json();
    })
    .then(function (data) {
        cityNameEl.textContent = `${data.name}`;
        cityTempEl.textContent = `Temp: ${data.main.temp}`;
        cityWindEl.textContent = `Wind: ${data.wind.speed} MPH`;
        cityHumidityEl.textContent = `Humidity: ${data.main.humidity}`;
        const imageURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
       
        getIcon(imageURL)
        getFiveDayURL(data.coord.lat, data.coord.lon);
});
}

function getIcon(link) {
    fetch(link)
    .then((response) => {
        return response;
    })
    .then((data) => {
        document.querySelector('#current-icon').src = data.url;
    })
}
function getFiveDayURL(latitude, longitude) {
const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`;
console.log(fiveDayURL);
fetch(fiveDayURL)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
for (let i = 0; i < forecastElList.children.length; i++){
    let forecastChildren = forecastElList.children[i].children[0];
    console.log(forecastChildren)
    forecastChildren.innerHTML = data.list[i + 9].main.temp
    // foreca
    // console.log(data.list[i].main)
}
})
}