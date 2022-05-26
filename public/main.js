// Grab DOM Elements
const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");

// Fetch weather from API
const fetchWeather = async (city) => {
    const url = `/api?q=${city}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
        alert("City not found.");
        return;
    }

    if (data.cod === "401") {
        alert("Invalid API Key.");
        return;
    }

    // metric/imperial subsets currently placeholders until toggle implemented
    // conversions for temps, times, wind, needed
    // replace several function calls later
    const displayData = {
        city: data.name,
        metric: {
            celsius: kelvinToCelsius(data.main.temp),
            high_celsius: kelvinToCelsius(data.main.temp_max),
            low_celsius: kelvinToCelsius(data.main.temp_min),
            feels_like: kelvinToCelsius(data.main.feels_like),
        },
        imperial: {
            farenheit: kelvinToFahrenheit(data.main.temp),
            high_farenheit: kelvinToFahrenheit(data.main.temp_max),
            low_farenheit: kelvinToFahrenheit(data.main.temp_min),
            feels_like: kelvinToFahrenheit(data.main.feels_like),
        },
        precipitation: data.precipitation, // 1hour, API field is undefined if no rain
        description: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed, // mph
        visibility: data.visibility,
        country: data.sys.country
    }

    addWeatherToDOM(displayData);
    console.log(data);
    console.log(displayData);
}

// Add display data to DOM
const addWeatherToDOM = data => {
    weatherDisplay.innerHTML = `
        <h1> Weather in ${data.city}, ${data.country}</h1>
        <h2>${data.imperial.farenheit} &deg;F | ${data.metric.celsius} &deg;C</h2>
    `
    
    cityInput.value = "";
}

// Consolidate multiple temp point functions

// Format unix timestamp for sunset/sunrise
// const formatTime = time => {

// }

// API's default value is Kelvin, so we convert to Farenheit/Celsius
// come back and try to refactor these so we aren't making several function calls
// just make one and pass all data back to displayData obj
const kelvinToFahrenheit = temp => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
}

const kelvinToCelsius = temp => {
    return Math.ceil(temp - 273.15);
}

// Form submission event listener
weatherForm.addEventListener("submit", e => {
    e.preventDefault();

    if (cityInput.value === "") {
        alert("Please enter a city.");
    } else {
        fetchWeather(cityInput.value);
    }
});

// Initial API call
fetchWeather("chicago");