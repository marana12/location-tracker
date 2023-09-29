import React, { useState, useEffect } from "react";
import SignalRService from "../../../Services/SignalR/SignalRService";
import { GetShortUrlDetails } from "../../../Services/APIs/LinksAPI";
import DeviceInfo from "./DeviceInfo";
import VisitorInfoDateTime from "./VisitorInfoDateTime";
import VisitorInfoModal from "./VisitorInfoModal";
import VisitorInfo, { VisitorLocation } from "../../../models/visitorInfo";

interface VisitorTableProps {
  visitors?: VisitorInfo[];
  hashUrl?: string | undefined | null;
}

export default function VisitorTable({ visitors, hashUrl }: VisitorTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState<any>();
  const [newLocations, setNewLocations] = useState<VisitorInfo[] | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [latNum, setLatNum] = useState(0);
  const [lonNum, setLonNum] = useState(0);
  const [visitorLocation, setVisitorLocation] = useState<VisitorLocation>();

  useEffect(() => {
    setNewLocations(visitors);
    console.log(visitors);
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
          setNewLocations(data.visitors);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    });
  }

  const onSetShowModal = (visitorInfo: VisitorInfo) => {
    setVisitorLocation(visitorInfo.location);

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
          {newLocations?.map((visitorInfo: VisitorInfo) => {
            return (
              <tr key={visitorInfo.id}>
                <td>
                  <VisitorInfoDateTime dateTime={visitorInfo.dateTime} />
                </td>
                <td style={{ minWidth: "130px" }}>{visitorInfo.ipAddress}</td>
                <td style={{ minWidth: "105px" }}>
                  <DeviceInfo
                    browser={visitorInfo.browser}
                    platform={visitorInfo.platform}
                  />
                </td>

                <td style={{ minWidth: "120px" }}>
                  <button
                    className="ip-btn ip-btn--link"
                    onClick={() => onSetShowModal(visitorInfo)}
                  >
                    Show Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <VisitorInfoModal
        handleShowModal={() => setShowModal(false)}
        showModal={showModal}
        visitorLocation={visitorLocation}
      />
    </div>
  );
}
