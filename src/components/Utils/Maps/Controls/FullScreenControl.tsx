import React, { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../MapContent/MapContext";

export default function FullScreenControl() {
  const { map } = useContext<any>(MapContext);

  useEffect(() => {
    if (!map) return;

    let fullScreenControl = new FullScreen({ className: "ip-btn" });
    map.controls.push(fullScreenControl);

    return () => map.controls.remove(fullScreenControl);
  }, [map]);

  return null;
}
