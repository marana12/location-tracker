import React, { useState, useEffect } from "react";
import SignalRService from "../../../Services/SignalR/SignalRService";
import { tryParseFloat } from "../../../Utils/Parse";
import Location from "../../../models/location";
import { GetShortUrlDetails } from "../../../Services/APIs/LinksAPI";
import DeviceInfo from "./DeviceInfo";
import LocationDateTime from "./LocationDateTime";
import LocationModal from "./LocationModal";

interface LocationsProps {
  locations?: Location[];
  hashUrl?: string | undefined | null;
}

export default function Locations({ locations, hashUrl }: LocationsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState<any>();
  const [newLocations, setNewLocations] = useState<Location[] | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [latNum, setLatNum] = useState(0);
  const [lonNum, setLonNum] = useState(0);

  useEffect(() => {
    setNewLocations(locations);
  }, []);

  useEffect(() => {
    if (!connection) {
      const signalr = new SignalRService("/iptrackersignalr");
      signalr.createConncetion();
      setConnection(signalr.connection);
    }

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  if (connection) {
    connection.on("refreshLocations-" + hashUrl, async () => {
      setIsLoading(true);
      try {
        const response = await GetShortUrlDetails(hashUrl);

        const { data } = response;

        if (data) {
          setNewLocations(data.locations);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    });
  }

  const onSetShowModal = (location: Location) => {
    const { lat, lon } = location;

    const latNum = tryParseFloat(lat, 0);
    const lonNum = tryParseFloat(lon, 0);

    setLatNum(latNum);
    setLonNum(lonNum);

    setShowModal(true);
  };

  return (
    <div className="table-responsive">
      <table className="location-table table table-hover align-middle">
        <thead>
          <tr>
            <th>DateTime</th>
            <th>IP Address</th>
            <th>Decive Info</th>
            <th>Location Info</th>
          </tr>
        </thead>
        <tbody>
          {newLocations?.map((location: Location) => {
            return (
              <tr key={location.id}>
                <td>
                  <LocationDateTime dateTime={location.dateTime} />
                </td>
                <td style={{ minWidth: "130px" }}>{location.ipAddress}</td>
                <td style={{ minWidth: "105px" }}>
                  <DeviceInfo
                    browser={location.browser}
                    platform={location.platform}
                  />
                </td>

                <td style={{ minWidth: "120px" }}>
                  <button
                    className="ip-btn ip-btn--link"
                    onClick={() => onSetShowModal(location)}
                  >
                    Show Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <LocationModal
        handleShowModal={() => setShowModal(false)}
        showModal={showModal}
        latNum={latNum}
        lonNum={lonNum}
      />
    </div>
  );
}
