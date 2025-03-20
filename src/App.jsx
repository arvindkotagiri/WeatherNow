import { useState } from "react";
import $ from "jquery";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const allWeatherCodes = {
    0: "Unknown",
    1000: ["Clear", "clear_day.svg", "clear_night"],
    1100: ["Mostly Clear", "mostly_clear_day.svg", "mostly_clear_night.svg"],
    1101: ["Partly Cloudy", "partly_cloudy_day.svg", "partly_cloudy_night.svg"],
    1102: ["Mostly Cloudy", "mostly_cloudy.svg"],
    1001: ["Cloudy", "cloudy.svg"],
    2000: ["Fog", "fog.svg"],
    2100: ["Light Fog", "fog_light.svg"],
    4000: ["Drizzle", "drizzle.svg"],
    4001: ["Rain", "rain.svg"],
    4200: ["Light Rain", "rain_light.svg"],
    4201: ["Heavy Rain", "rain_heavy.svg"],
    5000: ["Snow", "snow.svg"],
    5001: ["Flurries", "flurries.svg"],
    5100: ["Light Snow", "snow_light.svg"],
    5101: ["Heavy Snow", "snow_heavy.svg"],
    6000: ["Freezing Drizzle", "freezing_drizzle.svg"],
    6001: ["Freezing Rain", "freezing_rain.svg"],
    6200: ["Light Freezing Rain", "freezing_rain_light.svg"],
    6201: ["Heavy Freezing Rain", "freezing_rain_heavy.svg"],
    7000: ["Ice Pellets", "ice_pellets.svg"],
    7101: ["Heavy Ice Pellets", "ice_pellets_heavy.svg"],
    7102: ["Light Ice Pellets", "ice_pellets_light.svg"],
    8000: ["Thunderstorm", "tstorm.svg"],
  };

  const getWeatherData = () => {
    if (!city) return alert("Please enter a city name!");

    $.ajax({
      url: `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${
        import.meta.env.VITE_API_KEY
      }`,
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

  const getImage = (condition) => {
    const imgSrc = "clear_day.svg";

    return imgSrc;
  };

  return (
    <div id="weatherNow-root" className="flex flex-col h-screen w-screen">
      <header
        id="weatherNow-header"
        className="sm:flex-row flex flex-col py-3 bg-[#FFEFD5]"
      >
        {/* <div className=""> */}
        <p
          id="weatherNow-name-text"
          className="basis-1/3 text-2xl font-bold text-[#ff7900] ml-2"
        >
          WeatherNow
        </p>
        {/* </div>
        <div className="flex"> */}
        <input
          type="text"
          name=""
          id="weatherNow-search"
          className="flex-grow basis-2/3 rounded-full border-2 border-[#ff7900] bg-[#fff] text-center"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="button"
          value="SEARCH"
          className="flex-grow basis-1/3 rounded-full bg-[#ff7900] text-black"
          onClick={getWeatherData}
        />
        {/* </div> */}
      </header>
      <div id="weatherNow-main-content" className="flex-grow flex">
        <div
          id="weatherNow-card"
          className="w-screen content-center text-center"
        >
          {weather.location ? (
            <div className="flex flex-col">
              <div>
                <div>City: {weather.location.name}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-1">
                <div className="basis-1/3">
                  <img
                    src={allWeatherCodes[weather.data.values.weatherCode][1]}
                    className=""
                  />
                  <p className="text-xl font-bold">
                    Temperature: {weather.data.values.temperature}
                  </p>
                  <p className="font-semibold">
                    Condition:{" "}
                    {allWeatherCodes[weather.data.values.weatherCode][0]}
                  </p>
                </div>
                <div className="basis-2/3 flex flex-wrap gap-1">
                  <div
                    id="card"
                    className="border-2 border-[#ff7900] w-[49%] h-[49%] flex flex-col items-center p-2 rounded-xl shadow-md "
                  >
                    <img src="humidity.png" className="w-[40%] h-[60%] mb-2" />
                    <p className="text-center text-xl">
                      Humidity: {weather.data.values.humidity}
                    </p>
                  </div>
                  <div
                    id="card"
                    className="border-2 border-[#ff7900]  w-[49%] h-[49%] flex flex-col items-center p-2 rounded-xl shadow-md "
                  >
                    <img src="windSpeed.png" className="w-[40%] h-[60%] mb-2" />
                    <p className="text-center text-xl">
                      Wind Speed: {weather.data.values.windSpeed}
                    </p>
                  </div>
                  <div
                    id="card"
                    className="border-2 border-[#ff7900] w-[49%] h-[49%] flex flex-col items-center p-2 rounded-xl shadow-md "
                  >
                    <img
                      src="visibility.png"
                      className="w-[40%] h-[60%] mb-2"
                    />
                    <p className="text-center text-xl">
                      Visibility: {weather.data.values.visibility}
                    </p>
                  </div>
                  <div
                    id="card"
                    className="border-2 border-[#ff7900] w-[49%] h-[49%] flex flex-col items-center p-2 rounded-xl shadow-md "
                  >
                    <img src="uvIndex.png" className="w-[40%] h-[60%] mb-2" />
                    <p className="text-center text-xl">
                      UV Index: {weather.data.values.uvIndex}
                    </p>
                  </div>
                </div>
              </div>

              {/* <div>Time: {weather.data.time}</div> */}
            </div>
          ) : (
            <div id="weatherNow-card-noData" className="text-[#ff7900]">
              <p>Start searching for current weather data</p>
            </div>
          )}
        </div>
      </div>
      <footer id="weatherNow-footer">
        <p
          id="weatherNow-footer-text"
          className="w-full py-1 bg-[#FFEFD5] text-[#ff7900] text-center"
        >
          Developed & Maintained by Aravind Kotagiri{" "}
          <span className="text-[#808080]">(Powered by Tomorrow.io)</span>
          {/* Icon by Freepik  */}
        </p>
      </footer>
    </div>
  );
}

export default App;
