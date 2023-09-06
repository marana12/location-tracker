import OLMap from "../../../Utils/Maps/OLMap";

interface ModalMapProps {
  lonNum: number;
  latNum: number;
}
export default function ModalMap({ lonNum, latNum }: ModalMapProps) {
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
      </div>
    </div>
  );
}
