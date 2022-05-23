# Relay-Proxy

An API proxy/relay server built with Node.js to explore hiding API keys, rate limiting, and caching.

## Usage

### Install dependencies

`npm install`

### Run on http://localhost:5000

`npm run dev`

### Add public API info

Rename .env.example to .env and edit the values.

If the public API URL is https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}

- API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
- API_KEY_NAME = "appid"
- API_KEY_VALUE = "YOUR API KEY"

This project used this [YouTube tutorial](https://youtu.be/ZGymN8aFsv4) as a starting off point.
