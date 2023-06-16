import axios from "axios";

const geocodeURL = "https://api.openweathermap.org/geo/1.0/direct?";
const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "922dceef04a4ecdbb2116f3e3bc93723";

export const getgeocodes = async (query) => {
  const codes = await axios
    .get(geocodeURL, {
      params: {
        q: query,
        appid: API_KEY,
      },
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      console.log("Failed to fetch : ", err);
    });
  return codes;
};
export const fetchWeather = async (lati, longi) => {
  const { data } = await axios.get(URL, {
    params: {
      lat: lati,
      lon: longi,
      units: "metric",
      appid: API_KEY,
    },
  });

  return data;
};
