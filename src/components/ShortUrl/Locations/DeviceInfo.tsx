import { Browser, Platform } from "../../../models/location";
import "../../../styles/locations-table/device-info.scss";

interface DeviceInfoProps {
  browser?: Browser;
  platform?: Platform;
}

export default function DeviceInfo({ browser, platform }: DeviceInfoProps) {
  if (!browser && !platform) {
    return <div className="device-info"> No info</div>;
  }
  return (
    <div className="device-info">
      <div className="device-info__browser">
        <img
          className="browser-img"
          src={browser?.imageUrl}
          alt={browser?.displayName}
        />
        <span className="browser-name">{browser?.displayName}</span>
      </div>
      <div className="device-info__platform">
        <img
          className="platform-img"
          src={platform?.imageUrl}
          alt={platform?.displayName}
        />
        <span className="platform-name">{platform?.displayName}</span>
      </div>
    </div>
  );
}
