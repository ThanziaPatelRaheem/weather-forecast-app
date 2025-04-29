// import MapContainerWrapper from "./MapView";
import WeatherMap from "./WeatherMap";
import Low from "../Images/low.png";
import Humidity from "../Images/humidity.png";
import Visible from "../Images/visible.png";
import Sunset from "../Images/sea.png";
import Sunrise from "../Images/sunrise.png";
import Wind from "../Images/wind.png";
export default function WeatherDetails(props) {
  return (
    <>
      <section className="weather-details-container">
        <div className="details item-1">
          <img src={Humidity} />
          <p className="prop-font">{props.humidity}%</p>
          <p className="details-font"> Humidity</p>
        </div>
        <div className="details item-2">
          <img src={Wind} />

          <p className="prop-font">{props.windSpeed}Km/h</p>
          <p className="details-font">Wind Speed</p>
        </div>
        <div className="details item-3">
          <img src={Low} />

          <p className="prop-font">{props.pressure}hPa</p>
          <p className="details-font">Pressure</p>
        </div>
        <div className="details item-7">
          <WeatherMap lat={props.lat} lon={props.lon} />
        </div>
        <div className="details item-4">
          <img src={Visible} />

          <p className="prop-font">{props.visibility}Km</p>
          <p className="details-font">Visibility</p>
        </div>
        <div className="details item-5">
          <img src={Sunrise} />

          <p className="prop-font">{props.sunrise}</p>
          <p className="details-font">Sunrise</p>
        </div>

        <div className="details item-6">
          <img src={Sunset} />

          <p className="prop-font">{props.sunset}</p>
          <p className="details-font">Sunset</p>
        </div>
      </section>
    </>
  );
}
