import { useContext, useEffect } from "react";
import MapContext from "../MapContent/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";
import { Geometry } from "ol/geom.js";

interface VectorLayerProps {
  source: Vector<Geometry>;
  style?: any;
  zIndex?: number;
}

export default function VectorLayer({
  source,
  style,
  zIndex = 0,
}: VectorLayerProps) {
  const { map } = useContext<any>(MapContext);

  useEffect(() => {
    if (!map) return;
    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer);

    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
}
