const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const tempreture = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind_speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = 'cf7a00097a2bf9b6e3bfd16e4b3fc279';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === '404') {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    tempreture.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;

    const mainWeather = weather_data.weather[0].main;
    console.log("Weather main:", mainWeather);

    switch (mainWeather) {
        case 'Clear':
            weather_img.src = 'assets/clear.png';
            break;
        case 'Clouds':
            weather_img.src = 'assets/cloud.png';
            break;
        case 'Rain':
            weather_img.src = 'assets/rain.png';
            break;
        case 'Drizzle':
            weather_img.src = 'assets/drizzle.png';
            break;
        case 'Thunderstorm':
            weather_img.src = 'assets/thunderstorm.png';
            break;
        case 'Snow':
            weather_img.src = 'assets/snow.png';
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            weather_img.src = 'assets/mist.png';
            break;
        default:
            weather_img.src = 'assets/default.png';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
