import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

const MapView = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 13);
    }
  }, [lat, lon, map]);

  return (
    <Marker position={[lat, lon]}>
      <Popup>
        Weather location: {lat.toFixed(2)}, {lon.toFixed(2)}
      </Popup>
    </Marker>
  );
};

export default MapView;
