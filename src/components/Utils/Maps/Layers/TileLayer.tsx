import { useContext, useEffect } from "react";
import MapContext from "../MapContent/MapContext";
import OLTileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

interface TileLayerProps {
  source: OSM;
  zIndex?: number;
}

export default function TileLayer({ source, zIndex = 0 }: TileLayerProps) {
  const { map } = useContext<any>(MapContext);
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);
  return null;
}
