import "./index.css";
import "./App.css";
import React from "react";
import Weather from "../Components/Weather";
import WeatherDetails from "../Components/WeatherDetails";
import WeatherMap from "../Components/WeatherMap";
import Loading from "../Components/Loading";

const apikey = "befb5e5fbc87452311d1ef41b55ad5e7";

function App() {
  // state to updte the user Input

  const [cityName, setCityName] = React.useState("");
  const [weatherData, setWeatherData] = React.useState(null);

  const [units, setUnits] = React.useState("C");
  const [coords, setCoords] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(true);
  const [errorsfound, setError] = React.useState(null);

  function captureInput(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    console.log(formData);

    const city = formData.get("city").trim();
    console.log(city);

    const capitalizeFletter = city.charAt(0).toUpperCase() + city.slice(1);
    if (!capitalizeFletter) {
      setError("Please enter a city name");
    }
    setCityName(capitalizeFletter);
    setError(null);
    formEl.reset();
  }

  //geo location

  React.useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCityName("");
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setCityName("Singapore");
      },
      { timeout: 8000 }
    );
  }, []);

  const ERROR_MESSAGE = "City not found. Please enter a valid city name.";

  // api call
  React.useEffect(() => {
    if (!cityName && !coords) return;

    const url = cityName
      ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apikey}&units=metric`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(ERROR_MESSAGE);
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
        setisLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
        setisLoading(false);
      });
  }, [cityName, coords]);

  React.useEffect(() => {
    console.log("Updated error state:", errorsfound);
  }, [errorsfound]);

  function formatTime(unixTime, timezoneOffset) {
    const utcDate = new Date((unixTime + timezoneOffset) * 1000);
    return utcDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  }

  function formatDateTime(unixTime, timezoneOffset) {
    const utcDateTime = new Date((unixTime + timezoneOffset) * 1000);
    return utcDateTime.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  }

  const weatherMain = weatherData?.weather?.[0]?.main?.toLowerCase() || "";
  const desc = weatherData?.weather?.[0]?.description?.toLowerCase() || "";

  const isDay =
    weatherData?.dt >= weatherData?.sys?.sunrise &&
    weatherData?.dt < weatherData?.sys?.sunset;

  const isRainy =
    weatherMain.includes("rain") ||
    weatherMain.includes("drizzle") ||
    desc.includes("rain") ||
    desc.includes("drizzle");

  const isCloudy = weatherMain.includes("cloud");

  const isThunder = weatherMain.includes("thunder");

  const isFoggy =
    weatherMain.includes("mist") ||
    weatherMain.includes("fog") ||
    weatherMain.includes("haze") ||
    weatherMain.includes("smoke") ||
    weatherMain.includes("dust") ||
    weatherMain.includes("sand") ||
    weatherMain.includes("ash");

  const isClear = weatherMain.includes("clear");

  const isSnow = weatherMain.includes("snow");

  const isWindy =
    weatherMain.includes("wind") ||
    desc.includes("wind") ||
    desc.includes("breeze");

  const getBgClass = () => {
    if (isThunder) return isDay ? "bg-thunder-day" : "bg-thunder-night";
    if (isRainy) return isDay ? "bg-rain-day" : "bg-rain-night";
    if (isFoggy) return isDay ? "bg-haze-day" : "bg-haze-night";
    if (isCloudy) return isDay ? "bg-cloud-day" : "bg-cloud-night";
    if (isClear) return isDay ? "bg-clear-day" : "bg-clear-night";

    return isDay ? "bg-default-day" : "bg-default-night";
  };

  return (
    <>
      {!weatherData ? (
        <Loading />
      ) : (
        <main
          className={`main-grid ${getBgClass()} ${
            isDay ? "theme-light" : "theme-dark"
          }`}
        >
          {isRainy && (
            <>
              <div className="weather-overlay rain-overlay rain-far" />
              <div className="weather-overlay rain-overlay rain-near" />
            </>
          )}

          {isThunder && <div className="weather-overlay thunder-overlay" />}

          {isCloudy && <div className="weather-overlay cloud-overlay" />}

          {isFoggy && <div className="weather-overlay fog-overlay" />}

          {isClear && <div className="weather-overlay sun-overlay" />}

          {isSnow && <div className="weather-overlay snow-overlay" />}

          {isWindy && <div className="weather-overlay wind-overlay" />}

          <Weather
            onFormSubmit={captureInput}
            city={weatherData.name || cityName}
            temp={weatherData?.main.temp}
            feelLike={weatherData?.main.feels_like}
            unit={units}
            description={weatherData?.weather[0].description}
            iconCode={weatherData?.weather[0].icon}
            dateTime={formatDateTime(weatherData.dt, weatherData.timezone)}
            error={errorsfound}
          />
          {!errorsfound && weatherData?.main && (
            <WeatherDetails
              humidity={weatherData.main.humidity}
              windSpeed={weatherData.wind.speed}
              pressure={weatherData.main.pressure}
              visibility={(weatherData.visibility / 1000).toFixed(1)}
              sunrise={formatTime(
                weatherData.sys.sunrise,
                weatherData.timezone
              )}
              sunset={formatTime(weatherData.sys.sunset, weatherData.timezone)}
              lat={weatherData.coord.lat}
              lon={weatherData.coord.lon}
            />
          )}
        </main>
      )}
    </>
  );
}

export default App;
