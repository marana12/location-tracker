import { useState, useEffect } from "react";
import { getLocation } from "../Utils/Navigator";
import { GetOriginalUrl } from "../Services/APIs/LinksAPI";
import LoaderRipple from "./Utils/Loaders/LoaderRipple";
import { useParams } from "react-router-dom";
import "../styles/redirectPage.scss";

export default function RedirectPage() {
  const params = useParams();
  const hashUrl = params.hashUrl;

  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [isBusy, setBusy] = useState<boolean>(true);
  const [hasLocation, setHasLocation] = useState<boolean>(false);

  useEffect(() => {
    async function getGeoLocation() {
      try {
        const location = await getLocation();

        if (location) {
          setLatitude(location.latitude);
          setLongitude(location.longitude);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setHasLocation(true);
      }
    }

    async function getOriginalUrl() {
      const url = await GetOriginalUrl(hashUrl, latitude, longitude);

      if (url) {
        window.location.replace(url.originalUrl);
      }

      setBusy(false);
    }

    getGeoLocation();

    if (hasLocation && isBusy) {
      getOriginalUrl();
    }
  }, [hasLocation, isBusy]);

  return (
    <>
      <div className="home-container">{isBusy && <LoaderRipple />}</div>
    </>
  );
}
