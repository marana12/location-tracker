export default interface VisitorInfo {
    id: number;
    ipAddress: string;
    dateTime: string;
    location: VisitorLocation;
    device?: Device;
    browser?: Browser;
    platform?: Platform;
}

export interface VisitorLocation {
    lat: string;
    lon: string;
    country?: string;
    countryCode?: string;
    city?: string;
    isp?: string;
    countryFlag?: string;
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
