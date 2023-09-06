
import Link from "./link";
import Location from "./location";

export default interface ShortUrlModel {
    link: Link;
    locations: Location[];
}