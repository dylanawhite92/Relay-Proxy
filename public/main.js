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

    const displayData = {
        city: data.name,
        celsius: kelvinToCelsius(data.main.temp),
        farenheit: kelvinToFahrenheit(data.main.temp),
        high_farenheit: kelvinToFahrenheit(data.main.temp_max),
        low_farenheit: kelvinToFahrenheit(data.main.temp_min),
        feels_like: kelvinToFahrenheit(data.main.feels_like),
        precipitation: checkForPrecipitation(data.precipitation), // 1hour, API field is undefined if no rain
        description: capitalizeFirst(data.weather[0].description),
        sunrise: formatTime(data.sys.sunrise),
        sunset: formatTime(data.sys.sunset),
        humidity: data.main.humidity,
        wind_speed: convertWindSpeed(data.wind.speed), // mph
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
        <h2>${data.farenheit}&deg; F | ${data.celsius}&deg; C</h2>
        <h3>H: ${data.high_farenheit}&deg; L: ${data.low_farenheit}&deg;</h3>
        <p>Feels like: ${data.feels_like}&deg; ${data.description}.</p>
        <p>Humidity: ${data.humidity}% Precipitation: ${data.precipitation}.</p>
    `
    
    cityInput.value = "";
}

// Format unix timestamp for sunset/sunrise
const formatTime = time => {
    let timeValue = new Date(time * 1000);
    let hours = timeValue.getHours();
    let minutes = timeValue.getMinutes();
    let afterNoon = false;

    // Military time conversion
    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
        afterNoon = true;
    }

    let formattedTime = `${hours}:${minutes}`;

    // Add AM/PM
    afterNoon ? (formattedTime += "PM") : (formattedTime += "AM");

    return formattedTime;
}

// API's default value is Kelvin, so we convert to Farenheit/Celsius
const kelvinToFahrenheit = temp => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
}

const kelvinToCelsius = temp => {
    return Math.ceil(temp - 273.15);
}

// If there is rain, the field is given in mm
const checkForPrecipitation = precip => {
    if (!precip) {
        return "None";
    } else {
        let result = (precip) / 25.4;
        return result + " inches";
    }
}

// Convert m/s to mph
const convertWindSpeed = wind => {
    return Math.floor(wind * 2.237);
}

// Capitalize first letter of description field
// Not done by API for some reason
const capitalizeFirst = str => {
    let stringToCap = str.charAt(0).toUpperCase() + str.slice(1);
    return stringToCap;
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