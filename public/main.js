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
    // conversions for temps, times, vis, wind, needed
    const displayData = {
        city: data.name,
        farenheit: kelvinToFahrenheit(data.main.temp),
        celsius: kelvinToCelsius(data.main.temp),
        metric: {
            // celsius: kelvinToCelsius(data.main.temp),
            high_celsius: "",
            low_celsius: "",
            feels_like: "",
            wind_speed: "", // m/s
            visibility: "", // km
        },
        imperial: {
            // farenheit: kelvinToFahrenheit(data.main.temp),
            high_farenheit: "",
            low_farenheit: "",
            feels_like: "",
            wind_speed: "", // mph
            visibility: "", // miles
        },
        precipitation: "", // 1hour, API field is undefined if no rain
        description: "",
        sunrise: "",
        sunset: "",
        humidity: "",
        dewpoint: "",
        country: data.sys.country
    }

    addWeatherToDOM(displayData);
    console.log(data);
}

// Add display data to DOM
const addWeatherToDOM = data => {
    weatherDisplay.innerHTML = `
        <h1> Weather in ${data.city}, ${data.country}</h1>
        <h2>${data.farenheit} &deg;F | ${data.celsius} &deg;C</h2>
    `
    
    cityInput.value = "";
}

// API's default value is Kelvin, so we convert to Farenheit/Celsius
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