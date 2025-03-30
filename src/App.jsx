import { useState } from "react";
import $ from "jquery";
import { allWeatherCodes } from "./WeatherCodes";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeatherData = () => {
    if (!city) {
      setWeather("");
      $('#error-message').text("Enter a city name");
      $('#error-message').fadeIn().delay(3000).fadeOut();
      return;
    }
    setLoading(true);

    $.ajax({
      url: `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${
        import.meta.env.VITE_API_KEY
      }`,
      method: "GET",
      accepts: "application/json",
      success: function (response) {
        setWeather(response);
        setLoading(false);
      },
      error: function (error) {
        if(error.responseJSON.code === 429001) {
          $('#error-message').text("API Limit reached. Please try after sometime!");
          $('#error-message').fadeIn().delay(5000).fadeOut();
        }
        else {
          $('#error-message').text("City not found!");
          $('#error-message').fadeIn().delay(3000).fadeOut();
        }
        setWeather("");
        setLoading(false);
      },
    });
  };

  return (
    <div 
      id="weatherNow-root" 
      className={"flex flex-col min-h-screen bg-gradient-to-br from-amber-50 to-sky-100 transition-colors duration-500"}
    >
      <header className="py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-center">
          <h1 className="text-3xl font-bold text-amber-600 flex-1">
            WeatherNow
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter city name"
              className="px-4 py-2 rounded-full border-2 border-amber-400 bg-white text-center focus:outline-none focus:ring-2 focus:ring-amber-300 w-full"
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && getWeatherData()}
            />
            <button
              className="px-6 py-2 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors w-full sm:w-auto"
              onClick={getWeatherData}
              disabled={loading}
            >
              SEARCH
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div id="error-message" className="hidden fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded"></div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <svg className="animate-spin h-12 w-12 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-amber-700">Loading weather data...</p>
            </div>
          </div>
        ) : weather.location ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-1 flex flex-col items-center sm:items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {weather.location.name}
                  </h2>
                  
                  <div className="flex items-center gap-6 w-[100%] h-[100%] mt-[20px] justify-center sm:justify-start">
                    <img 
                      src={allWeatherCodes[weather.data.values.weatherCode][1]} 
                      alt="Weather condition"
                      className="w-40 h-40"
                    />
                    <div>
                      <p className="text-5xl font-bold text-gray-800">
                        {Math.round(weather.data.values.temperature)}°C
                      </p>
                      <p className="text-xl text-gray-600">
                        {allWeatherCodes[weather.data.values.weatherCode][0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                    <img src="humidity.png" className="w-12 h-12 mb-2" alt="Humidity" />
                    <p className="text-gray-500">Humidity</p>
                    <p className="text-xl font-semibold">{weather.data.values.humidity}%</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                    <img src="windSpeed.png" className="w-12 h-12 mb-2" alt="Wind Speed" />
                    <p className="text-gray-500">Wind Speed</p>
                    <p className="text-xl font-semibold">{weather.data.values.windSpeed} km/h</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                    <img src="visibility.png" className="w-12 h-12 mb-2" alt="Visibility" />
                    <p className="text-gray-500">Visibility</p>
                    <p className="text-xl font-semibold">{weather.data.values.visibility} km</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                    <img src="uvIndex.png" className="w-12 h-12 mb-2" alt="UV Index" />
                    <p className="text-gray-500">UV Index</p>
                    <p className="text-xl font-semibold">{weather.data.values.uvIndex}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 p-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">More Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Feels Like</p>
                  <p className="font-medium">{weather.data.values.temperatureApparent}°C</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Pressure</p>
                  <p className="font-medium">{weather.data.values.pressureSurfaceLevel} hPa</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Dew Point</p>
                  <p className="font-medium">{weather.data.values.dewPoint}°C</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-500 text-sm">Cloud Cover</p>
                  <p className="font-medium">{weather.data.values.cloudCover}%</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <img src="/logo.png" className="w-[40%] h-[40%] m-auto"/>
              <h2 className="text-2xl font-bold text-amber-600 mt-4 mb-2">Welcome to WeatherNow</h2>
              <p className="text-gray-600 mb-6">
                Search for a city to get current weather information.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-2 border-t border-gray-200">
        <div className="container mx-auto px-1 text-center flex flex-col sm:flex-row justify-center gap-2">
          <p className="text-amber-600">Developed & Maintained by <a href="https://github.com/arvindkotagiri/" target="_blank" className="underline">Aravind Kotagiri</a></p>
          <p className="hidden sm:inline text-gray-400">•</p> 
          <p className="text-gray-500">Powered by Tomorrow.io</p>
          <p className="hidden sm:inline text-gray-400">•</p> 
          <p className="text-gray-500">Designed by Freepik</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
