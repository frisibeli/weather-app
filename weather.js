document.addEventListener("DOMContentLoaded", init)

const API_URL = 'http://api.openweathermap.org/data/2.5'
const APP_ID = 'f87a43d4ef836f82122aa25fa80507ca';

function init(){
    let formElement = document.querySelector('#search-form');
    let textInputElement = document.querySelector('#search');
    let resultElement = document.querySelector('#results')

    formElement.addEventListener('submit', function(e){
        e.preventDefault();
        let city = textInputElement.value;
        queryWeather(city)
            .then(handleResult);

        resultElement.style.display = "block"
    });

    textInputElement.addEventListener('keypress', e => {
        if(e.key == "Enter"){
            e.preventDefault();
            let city = textInputElement.value;
            queryWeather(city)
                .then(handleResult);
            
            resultElement.style.display = "block"

        }
    })

}

function queryWeather(city, lat, lon) {
    if(lat && lon){
        return fetch(`${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`)
            .then(response => response.json())
    }
    return fetch(`${API_URL}/weather?q=${city}&appid=${APP_ID}&units=metric`)
            .then(response => response.json())
}

function handleResult(result){
    let cityName = document.querySelector('#city-name')
    let temperature = document.querySelector('#temperature')
    let humidity = document.querySelector('#humidity')
    let weatherIcon = document.querySelector('#weather-icon')
    let description = document.querySelector('#description')

    temperature.innerText = result.main.temp;
    cityName.innerText = result.name;
    humidity.innerText = result.main.humidity;
    description.innerText = result.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
}