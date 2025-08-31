import express from "express";
import axios from "axios";
import { ensureAuth } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/current", ensureAuth, async (req, res) => {
  try {
    const { lat, lon } = req.body;
    if (!lat || !lon) return res.status(400).json({ message: "lat & lon required" });

    const key = process.env.OPENWEATHER_API_KEY;
    if (!key) return res.status(500).json({ message: "Weather API key not configured" });

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=metric&appid=${key}`;

    const response = await axios.get(url);
    // return weather data
    return res.json({ weather: response.data });
  } catch (err) {
    console.error("Weather error:", err?.response?.data || err.message);
    return res.status(500).json({ message: "Failed to fetch weather" });
  }
});

export default router;
