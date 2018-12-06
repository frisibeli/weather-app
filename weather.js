document.addEventListener("DOMContentLoaded", init)

const API_URL = 'http://api.openweathermap.org/data/2.5'
const APP_ID = 'f87a43d4ef836f82122aa25fa80507ca';

function init(){
    let formElement = document.querySelector('#search-form');
    let textInputElement = document.querySelector('#search');

    formElement.addEventListener('submit', function(e){
        e.preventDefault();
        let city = textInputElement.value;
        queryWeather(city)
            .then(res => console.log(res));
    });

    textInputElement.addEventListener('keypress', e => {
        if(e.keyCode == 13){
            e.preventDefault();
            let city = textInputElement.value;
            queryWeather(city)
                .then(res => console.log(res));
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

}