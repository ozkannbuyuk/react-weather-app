import React, { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather Application</h1>
      <div className="input-container">
        <input
          className="location-input"
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div className="day-container" key={day.date}>
              <h2 className="date"> {convertToDate(day.date)}</h2>
              <img
                className="weather-icon"
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <p className="temperature"> {day.day.avgtemp_c}°C</p>
              <p className="condition"> {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
