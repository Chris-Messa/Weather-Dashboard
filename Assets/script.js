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
    localStorage.setItem("searched-city", searchedCity);
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
            cityTempEl.textContent = `Temp: ${data.main.temp} °F`;
            cityWindEl.textContent = `Wind: ${data.wind.speed} MPH`;
            cityHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;
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
            var listAt = 2;
            for (let i = 0; i < forecastElList.children.length; i++) {
                // const imageURL = `https://openweathermap.org/img/wn/${data.list[listAt].weather[listAt].icon}@2x.png`
    
                // getIcon(imageURL)
                let forecastChildren = forecastElList.children[i];
                forecastChildren.children[0].children[0].textContent = data.list[listAt].dt_txt.slice(0, 10);
                forecastChildren.children[0].children[2].textContent = `Temp: ${data.list[listAt].main.temp} °F`;
                forecastChildren.children[0].children[3].textContent = `Wind: ${data.list[listAt].wind.speed} MPH`;
                forecastChildren.children[0].children[4].textContent = `Humidity: ${data.list[listAt].main.humidity}%`;
                
                listAt += 8;
            }
        })
}