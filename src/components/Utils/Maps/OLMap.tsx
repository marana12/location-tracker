import { useEffect, useState } from "react";
import Map from "./MapContent/Map";
import Layers from "./Layers/Layers";
import TileLayer from "./Layers/TileLayer";
import VectorLayer from "./Layers/VectorLayer";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source/index";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Controls from "./Controls/Controls";
import FullScreenControl from "./Controls/FullScreenControl";
import mapConfig from "./config.json";

// const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];
interface OLMapProps {
  markersLonLat: Array<Array<number>>;
  center: Array<number>;
  zoom: number;
}

function addMarkers(lonLatArray: Array<Array<number>>): Feature<Point>[] {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });

  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

export default function OLMap({
  markersLonLat,
  center = mapConfig.center,
  zoom = 10,
}: OLMapProps) {
  const [newCenter, setNewCenter] = useState(center);
  const [newZoom, setZoom] = useState(zoom);
  const [showMarker, setShowMarker] = useState(false);
  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  useEffect(() => {
    if (markersLonLat) {
      setFeatures(addMarkers(markersLonLat));
      setShowMarker(true);
    }
  }, [markersLonLat]);

  return (
    <Map center={fromLonLat(newCenter)} zoom={newZoom}>
      <Layers>
        <TileLayer source={osm()} zIndex={0} />
        {showMarker && <VectorLayer source={vector({ features })} />}
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </Map>
  );
}
