# 🌤️ Weather App

A **simple weather app** that fetches and displays live weather data using the [OpenWeather API](https://openweathermap.org/). 🌦️  
Built using **React** and modern JavaScript (ES6+).

---

### Live Demo

You can check out the live demo of the Weather App here: [Live Demo](https://yourusername.github.io/weather-app-v1/)

---

## 🔍 Features

- 📍 Location-based weather using browser geolocation
- 🌡️ Current temperature and feels-like temp
- 💧 Humidity and pressure
- 🌬️ Wind speed
- 🌫️ Visibility (in km)
- 🌅 Sunrise and 🌇 Sunset times (localized)
- 📆 Current date and time formatted cleanly
- 🔄 Real-time API fetching and UI update

---

## ⚙️ Tech Stack

| Technology     | Purpose                        |
|----------------|--------------------------------|
| **React**      | UI library                     |
| **HTML5**      | App structure                  |
| **CSS**        | Styling                        |
| **JavaScript** | Logic and interactivity        |
| **OpenWeather API** | Weather data provider     |

---

## ⚛️ React Functionality Used

The app is built entirely with **React functional components** and hooks:

### 📦 State Management

- `useState`  
  - To store city name, API response, loading status, and errors
  - To handle temperature unit and coordinates

### 📡 Side Effects & Lifecycle

- `useEffect`  
  - To fetch weather data when city or coordinates change
  - To get the user’s geolocation on first render
  - For logging errors and debugging

---





