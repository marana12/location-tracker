import { getLocationsByHash } from "../../../Services/ShortUrlService";
import React, { useState, useEffect, useCallback } from "react";
import SignalRService from "../../../Services/SignalR/SignalRService";
import Modal from "../../Utils/Modal/Modal";
import { tryParseFloat } from "../../../Utils/Parse";
import ModalConntent from "../../Utils/Modal/ModalContent/ModalContent";
import ModalHeader from "../../Utils/Modal/ModalContent/ModalHeader";
import ModalBody from "../../Utils/Modal/ModalContent/ModalBody";
import Location from "../../../models/location";
import ModalMap from "./ModalMap/ModalMap";
import { GetShortUrlDetails } from "../../../Services/APIs/LinksAPI";

interface LocationsProps {
  locations?: Location[];
  hashUrl?: string;
}

export default function Locations({ locations, hashUrl }: LocationsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState<any>();
  const [newLocations, setNewLocations] = useState<Location[] | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [latNum, setLatNum] = useState(0);
  const [lonNum, setLonNum] = useState(0);

  useEffect(() => {
    if (!connection) {
      const signalr = new SignalRService("/iptrackersignalr");
      signalr.createConncetion();
      setConnection(signalr.connection);
    }
    setNewLocations(locations);
  }, []);

  useEffect(() => {
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
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>DateTime</th>
            <th>IP Address</th>
            <th>Location Info</th>
          </tr>
        </thead>
        <tbody>
          {newLocations?.map((location: Location) => {
            return (
              <tr key={location.id}>
                <td>{location.dateTime}</td>
                <td>{location.ipAddress}</td>
                <td>
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

      <Modal show={showModal}>
        <ModalConntent>
          <ModalHeader title={"Extended"} onClose={() => setShowModal(false)} />
          <ModalBody>
            {showModal && <ModalMap latNum={latNum} lonNum={lonNum} />}
          </ModalBody>
        </ModalConntent>
      </Modal>
    </>
  );
}
