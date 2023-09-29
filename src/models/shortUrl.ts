
import Link from "./link";
import VisitorInfo from "./visitorInfo";

export default interface ShortUrlModel {
    link: Link;
    visitors: VisitorInfo[];
}