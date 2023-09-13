import { extend } from "ol/extent";

export default interface Location {
    id: number;
    ipAddress: string;
    lat: string;
    lon: string;
    dateTime: string;
    device?: Device;
    browser?: Browser;
    platform?: Platform;

}

export interface Device extends DeviceInfo {
}

export interface Browser extends DeviceInfo {
}

export interface Platform extends DeviceInfo {
}

interface DeviceInfo {
    displayName: string;
    imageUrl: string;
}
