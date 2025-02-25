const searchbox = document.querySelector('.city-input');
const search = document.getElementById('search');
const temperature = document.querySelector('.temp-text');
const description = document.querySelector('.condition');
const humidity = document.querySelector('.hum');
const windspeed = document.querySelector('.windspeed');
const weather_image = document.querySelector('.weather-image');

async function checkWeather(city) {
    const apikey = "738c6ebd5901fb2ba45f2be6326a716c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === '404') {
            weather_image.src = "default.png";  
            temperature.innerHTML = "--°C";
            description.innerHTML = "City not found!";
            humidity.innerHTML = "--%<br>Humidity";
            windspeed.innerHTML = "-- km/h <br>Winds";
            return;
        }


        temperature.innerHTML = `${(weatherData.main.temp - 273.15).toFixed(2)}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%<br>Humidity`;
        windspeed.innerHTML = `${weatherData.wind.speed} km/h <br>Winds`;

        // Fix image path issue
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        switch (weatherCondition) {
            case 'clouds':
                weather_image.src = "clouds.png";
                break;
            case 'clear':
                weather_image.src = "clear.png";
                break;
            case 'rain':
                weather_image.src = "rain.png";
                break;
            case 'mist':
                weather_image.src = "mist.png";
                break;
            case 'snow':
                weather_image.src = "snow.png";
                break;
                
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

search.addEventListener('click', () => {
    if (searchbox.value.trim() === "") {
        alert("Please enter a city name!");
        return;
    }
    checkWeather(searchbox.value);
});
