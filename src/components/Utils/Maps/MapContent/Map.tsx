import React, { useRef, useState, useEffect, RefObject } from "react";
import MapContext from "./MapContext";
import { View, Map as MapType } from "ol";

interface MapProps {
  children: React.ReactNode;
  zoom: number;
  center: number[];
}
export default function Map({ children, zoom, center }: MapProps) {
  const mapRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapType>();

  // on component mount
  useEffect(() => {
    let options = {
      view: new View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new MapType(options);

    if (mapRef.current) {
      mapObject.setTarget(mapRef.current);
    }

    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
}
