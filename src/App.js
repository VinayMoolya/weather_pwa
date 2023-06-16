import React, { useState } from "react";
import { fetchWeather, getgeocodes } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [code, setCodes] = useState("");
  const search = async (e) => {
    if (e.key === "Enter") {
      const codes = await getgeocodes(query);
      if (codes !== undefined) {
        const data = await fetchWeather(codes["lat"], codes["lon"]);
        // console.log(data);
        setWeather(data);
        setCodes("1");
        setQuery(""); // after the process we just clear the query
      } else {
        setCodes("0");
        // console.log("No information");
      }
    }
  };
  return (
    <div className="main-container">
      <div className="error">
        <span className="errmsg">
          {code === "0" ? (
            <p>
              <u>No Information can be Extracted , Invalid City !</u>
            </p>
          ) : (
            <p></p>
          )}
        </span>
      </div>
      <h1 className="heading">
        Progressive Web Application - Weather Reporter
      </h1>
      <input
        type="text"
        className="search"
        placeholder="Type the city name .."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && code && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
