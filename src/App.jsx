import React, { useState } from "react";
import "./App.css";

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";
import loaderIcon from "./assets/loader.svg";

function App() {
  const apiKey = "a681279e58d56263c5afbdee07e1da32";

  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
    icon: cloudIcon,
    error: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const cityInput = document.querySelector(".cityInput");
    if (!cityInput.value) return;

    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: data.main.humidity + "%",
        windSpeed: data.wind.speed + " km/h",
        temperature: data.main.temp + " °C",
        location: data.name,
        icon: getWeatherIcon(data.weather[0].icon),
        error: null,
      });
    } catch (error) {
      setWeatherData({ ...weatherData, error: "Error fetching weather data" });
    }

    setLoading(false);
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clearIcon;
      case "02d":
      case "02n":
        return cloudIcon;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return drizzleIcon;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return rainIcon;
      case "13d":
      case "13n":
        return snowIcon;
      default:
        return clearIcon;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon">
          {loading ? ( // Show loader if loading state is true
            <img src={loaderIcon} alt="Loader" />
          ) : (
            <img src={searchIcon} alt="Search" onClick={handleSearch} />
          )}
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherData.icon} alt="Weather" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="Wind Speed" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      {weatherData.error && (
        <div className="error-message">{weatherData.error}</div>
      )}
    </div>
  );
}

export default App;
