import { useParams } from "react-router-dom";
import LinkForm from "./LinkForm";
import Locations from "./Locations/Locations";
import { useEffect, useState } from "react";
import ShortUrlModel from "../../models/shortUrl";
import { GetShortUrlDetails } from "../../Services/APIs/LinksAPI";

import "../../styles/short-url-pages.scss";
import LinkInformation from "./LinkInformation";

export default function ShortUrl() {
  const { hashUrl } = useParams();

  const [shortUrlModel, setShortUrlModel] = useState<ShortUrlModel>();

  const [isHashUrl, setIsHasUrl] = useState<boolean>(hashUrl !== undefined);

  useEffect(() => {
    const getShortUrlDetails = async () => {
      const response = await GetShortUrlDetails(hashUrl);

      if (response.status === 200) {
        setShortUrlModel(response.data);

        setIsHasUrl(hashUrl !== undefined);
      }
    };

    if (hashUrl) {
      getShortUrlDetails();
    }
  }, [hashUrl]);

  return (
    <>
      {!isHashUrl && (
        <div className="short-url-container">
          <div className="short-url-card">
            <LinkForm />
          </div>
        </div>
      )}

      {shortUrlModel?.link && <LinkInformation link={shortUrlModel.link} />}

      {shortUrlModel?.locations && (
        <div className="locations-card">
          <Locations hashUrl={hashUrl} locations={shortUrlModel?.locations} />
        </div>
      )}
    </>
  );
}
