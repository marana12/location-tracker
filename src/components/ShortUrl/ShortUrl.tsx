import { useParams, Link as RouterLink } from "react-router-dom";
import Locations from "./Locations/Locations";
import { useEffect, useState } from "react";
import ShortUrlModel from "../../models/shortUrl";
import { GetShortUrlDetails } from "../../Services/APIs/LinksAPI";

import LinkInformation from "./LinkInformation";
import "../../styles/short-url-pages.scss";

export default function ShortUrl() {
  const { hashUrl } = useParams();
  const [shortUrlModel, setShortUrlModel] = useState<ShortUrlModel>();

  const [isHashUrl] = useState<boolean>(hashUrl !== undefined);

  useEffect(() => {
    const getShortUrlDetails = async () => {
      const response = await GetShortUrlDetails(hashUrl);

      if (response.status === 200) {
        setShortUrlModel(response.data);
      }
    };

    if (isHashUrl) {
      getShortUrlDetails();
    }
  }, [hashUrl]);

  return (
    <>
      {shortUrlModel?.link && (
        <>
          <LinkInformation link={shortUrlModel.link} />
          <div className="link-info-table--button">
            <RouterLink
              className="ip-btn ip-btn--primary"
              to={"/admin/short-url/"}
            >
              Create new short link
            </RouterLink>
          </div>
        </>
      )}

      {shortUrlModel?.locations && (
        <div className="locations-card">
          <Locations hashUrl={hashUrl} locations={shortUrlModel?.locations} />
        </div>
      )}
    </>
  );
}
