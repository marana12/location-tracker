import XYZ, { Options } from "ol/source/XYZ";

function xyz({ url, attributions, maxZoom }: Options) {
  return new XYZ({ url, attributions, maxZoom });
}

export default xyz;
