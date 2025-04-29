export default function Weather(props) {
  console.log("Icon code:", props.iconCode);
  console.log("Received error prop:", props.error);
  const iconCode = props.iconCode;
  const imageIcon = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}.png`
    : null;
  return (
    <>
      <section className="weather-wrap">
        <h1>Weather Forecast</h1>
        <form onSubmit={props.onFormSubmit} className="weather-form">
          <input type="text" name="city" placeholder="Enter City"></input>
          <button type="submit">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
        {props.error && <p className="error-message">{props.error}</p>}

        {props.temp && !props.error && (
          <div className="weather-condition">
            <div className="img-container">
              {imageIcon && (
                <img
                  className="weather-img"
                  src={imageIcon}
                  alt="Weather icon"
                />
              )}
            </div>

            <div className="details-container">
              <h1>
                {props.unit === "C"
                  ? Math.round(props.temp)
                  : Math.round((props.temp * 9) / 5 + 32)}
                °{props.unit}
              </h1>
              <p className="description">{props.description}</p>
              <h2 className="city-name">{props.city}</h2>

              <p className="feels-like">Feels like {props.feelLike}</p>
              <p className="date">{props.dateTime}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
