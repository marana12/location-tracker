import { Vector as VectorSource } from "ol/source";
import { Geometry } from "ol/geom";
import { Options } from "ol/source/Vector";

function vector({ features }: Options<Geometry>) {
  return new VectorSource({
    features,
  });
}

export default vector;
