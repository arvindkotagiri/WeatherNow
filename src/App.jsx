import { useState } from "react";
import $ from "jquery";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const allWeatherCodes = {
    0: "Unknown",
    1000: "Clear, Sunny",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  };

  const getWeatherData = () => {
    if (!city) return alert("Please enter a city name!");

    $.ajax({
      url: `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${import.meta.env.VITE_API_KEY}`,
      method: "GET",
      accepts: "application/json",
      success: function (response) {
        setWeather(response);
        console.log(weather);
      },
      error: function () {
        alert("City not found or API error!");
      },
    });
  };

  return (
    <div id="weatherNow-root" className="flex flex-col h-screen w-screen">
      <header id="weatherNow-header" class="sm:flex-row flex flex-col m-2">
        {/* <div className=""> */}
          <p id="weatherNow-name-text" className="basis-1/3 text-2xl font-bold">
            WeatherNow
          </p>
        {/* </div>
        <div className="flex"> */}
          <input
            type="text"
            name=""
            id="weatherNow-search"
            className="flex-grow basis-2/3 rounded-full border-2 border-indigo-600 text-center"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="button"
            value="SEARCH"
            className="flex-grow basis-1/3 rounded-full bg-indigo-600 text-white"
            onClick={getWeatherData}
          />
        {/* </div> */}
      </header>
      <div id="weatherNow-main-content" className="flex-grow flex">
        <div id="weatherNow-card">
          {weather.location ? (
            <div>
              <div>City: {weather.location.name}</div>
              <div>Time: {weather.data.time}</div>
              <div>Temperature: {weather.data.values.temperature}</div>
              <div>
                Condition: {allWeatherCodes[weather.data.values.weatherCode]}
              </div>
              <div>Humidity: {weather.data.values.humidity}</div>
              <div>Wind Speed: {weather.data.values.windSpeed}</div>
            </div>
          ) : (
            <div>
              <p>Start searching for current weather data</p>
            </div>
          )}
        </div>
      </div>
      <footer id="weatherNow-footer">
        <p id="weatherNow-footer-text" className="w-full py-1 bg-gray-900 text-white text-center">
          Developed & Maintained by Aravind Kotagiri (Weather data provided by Tomorrow.io © CC BY 4.0
          )
        </p>
      </footer>
    </div>
  );
}

export default App;
