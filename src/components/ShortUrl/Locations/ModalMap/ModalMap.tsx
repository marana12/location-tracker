import { VisitorLocation } from "../../../../models/visitorInfo";
import OLMap from "../../../Utils/Maps/OLMap";
import { tryParseFloat } from "../../../../Utils/Parse";

interface ModalMapProps {
  location: VisitorLocation | undefined;
}
export default function ModalMap({ location }: ModalMapProps) {
  const latNum = tryParseFloat(location?.lat, 0);
  const lonNum = tryParseFloat(location?.lon, 0);

  return (
    <div className="modal-map">
      <div className="map-container">
        <OLMap
          center={[lonNum, latNum]}
          markersLonLat={[[lonNum, latNum]]}
          zoom={15}
        />
      </div>

      <div className="map-info">
        <p>Latitude: {latNum}</p>
        <p>Longitude: {lonNum}</p>
        {location?.city && <p>City: {location?.city}</p>}
        {location?.country && (
          <p>
            Contry: {location?.country}
            {location?.countryFlag && (
              <img src={location?.countryFlag} alt={location?.country} />
            )}
          </p>
        )}
        {location?.city && <p>City: {location?.city}</p>}
      </div>
    </div>
  );
}
