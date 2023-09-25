import { useState, useEffect } from "react";
import { getLocation } from "../Utils/Navigator";
import { AddVisitor, GetUrl } from "../Services/APIs/LinksAPI";
import LoaderRipple from "./Utils/Loaders/LoaderRipple";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/redirectPage.scss";

export default function RedirectPage() {
  const params = useParams();
  const hashUrl = params.hashUrl;
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [isBusy, setBusy] = useState<boolean>(true);
  const [originalUrl, setOriginalUrl] = useState<string>();
  const [haveLocation, setHaveLocation] = useState<boolean>(false);

  useEffect(() => {
    const getUrl = async () => {
      try {
        const response = await GetUrl(hashUrl);
        if (response.data) {
          const { originalUrl } = response.data;

          setOriginalUrl(originalUrl);
        }
      } catch (error) {
        navigate("404");
      }
    };

    getUrl();
  }, [hashUrl]);

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
      }
    }

    getGeoLocation().then(() => {
      setHaveLocation(true);
    });
  }, [originalUrl != null]);

  useEffect(() => {
    async function addNewVisitor() {
      if (originalUrl != undefined) {
        AddVisitor(hashUrl, latitude, longitude)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
          .finally(() => {
            window.location.replace(originalUrl);

            setBusy(false);
          });
      }
    }

    addNewVisitor();
  }, [haveLocation == true]);
  return (
    <>
      <div className="home-container">{isBusy && <LoaderRipple />}</div>
    </>
  );
}
