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

  const [cityName, setCityName] = React.useState("singapore");
  const [weatherData, setWeatherData] = React.useState(null);

  const [units, setUnits] = React.useState("C");
  const [coords, setCoords] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(true);
  const [errorsfound, setError] = React.useState(null);

  // function toggleUnits() {
  //   setUnits(units === "C" ? "F" : "C");
  // }

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
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      function () {
        alert("Could not get your location");
      }
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

  return (
    <>
      {!weatherData ? (
        <Loading />
      ) : (
        <main>
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
