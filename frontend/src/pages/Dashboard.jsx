import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    // try to get location and fetch weather
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await axios.post("/api/weather/current", { lat: latitude, lon: longitude });
        setWeather(res.data.weather);
      } catch (err) {
        setError(err?.response?.data?.message || "Could not fetch weather");
      }
    }, (err) => {
      setError("Permission denied or unavailable location: " + err.message);
    });
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{user.name}</strong> ({user.email})</p>

      <section style={{ marginTop: 20 }}>
        <h3>Current Weather (your location)</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && !weather && <p>Fetching weather… (allow location)</p>}
        {weather && (
          <div>
            <p><strong>{weather.name}</strong> — {weather.weather[0].description}</p>
            <p>Temp: {weather.main.temp} °C (feels like {weather.main.feels_like} °C)</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </section>
    </div>
  );
}
