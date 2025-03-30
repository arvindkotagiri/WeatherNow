# WeatherNow 🌦️

[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0.14-yellow)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.14-blueviolet)](https://tailwindcss.com/)
[![jQuery](https://img.shields.io/badge/jQuery-3.7.1-green)](https://jquery.com/)

---

## 📄 Overview

WeatherNow is a **Vite-powered React** application that delivers real-time weather data through an elegant dashboard interface. Built with modern web technologies including **Tailwind CSS** for styling and **jQuery** for streamlined **AJAX** requests, this responsive application fetches current weather conditions from the Tomorrow.io API.

## ✨ Features

#### Core Functionality

- Real-time weather data from Tomorrow.io API
- Comprehensive weather metrics display

#### UI/UX Highlights

- Responsive design for all devices
- Intuitive metric cards with relevant icons

#### Technical Features

- Error handling with user-friendly messages
- API rate limit detection
- Keyboard navigation support
- Optimized performance with React hooks

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weathernow.git
   cd weathernow
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**

   ```bash
   echo "VITE_API_KEY=your_tomorrow_io_api_key" > .env
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🌐 API Integration

The application uses the Tomorrow.io Weather API with the following endpoints:

**Realtime Weather**

```code
GET https://api.tomorrow.io/v4/weather/realtime
```

**Parameters**

```code
location: City name or coordinates
apikey: Your API key
```

## 🖥️ UI Components

#### Search Header
-   Responsive search input
-   Error message display

#### Weather Display

-   Large temperature reading
-   Weather condition icon
-   "Feels like" temperature

#### Metric Grid

| Metric | Icon | Description |
| ------ | ------ | ------ |
| Humidity | <img src="./public/humidity.png" width="20" height="20"> | Current humidity percentage |
| Wind Speed | <img src="./public/windSpeed.png" width="20" height="20"> | Wind speed in km/h |
| Visibility | <img src="./public/visibility.png" width="20" height="20"> | Visibility distance in km |
| UV Index | <img src="./public/uvIndex.png" width="20" height="20"> | Current UV index |

## 🚨 Error Handling

The application handles several error scenarios:

1. Empty Search Input
   -   Shows "Enter a city name" message
   -   Triggers shake animation

2.  API Rate Limit
    -   Displays "API Limit reached" message
    -   Automatically fades after 5 seconds

3. City Not Found
   -   Shows "City not found" message
   -   Clears previous weather data

## 👨‍💻 Author

[Aravind Kotagiri](https://github.com/arvindkotagiri)

---

## 📜 License

- **Application Code**: MIT License © 2023 [Aravind Kotagiri](https://github.com/arvindkotagiri)
- **Weather Data**: Creative Commons Attribution 4.0 (CC BY 4.0) by Tomorrow.io
- **Weather Icons**: [FreePik](https://www.freepik.com/)

## Attribution Requirements

If using Tomorrow.io data, include this attribution in your app's UI or documentation:

```sh
"Weather icons provided by Tomorrow.io under CC BY 4.0 license"
```

If you are using weather icons provided by FreePik, include this attribution in your app's UI:

```sh
"Designed by Freepik"
```
