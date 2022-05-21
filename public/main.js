// Grab DOM Elements
const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");

// Fetch weather from API
const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=096f66487a2de80a0eb869508f0fb71b
    `;

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
        temp: kelvinToFahrenheit(data.main.temp)
    }

    addWeatherToDOM(displayData);
}

// Add display data to DOM
const addWeatherToDOM = data => {
    weatherDisplay.innerHTML = `
        <h1> Weather in ${data.city}</h1>
        <h2>${data.temp} &deg;F</h2>
    `
    
    cityInput.value = "";
}

// API's default value is Kelvin, so we convert to Farenheit
const kelvinToFahrenheit = temp => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
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