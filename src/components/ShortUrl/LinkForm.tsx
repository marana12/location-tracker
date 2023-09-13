import React, { useState, useCallback } from "react";
import { CreateShortUrl } from "../../Services/APIs/LinksAPI";
import { useNavigate } from "react-router-dom";
import "../../styles/link-form-page.scss";

export default function LinkForm() {
  const [isBusy, setIsBusy] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>();
  const navigate = useNavigate();

  const submitHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsBusy(true);
      try {
        if (originalUrl) {
          const response = await CreateShortUrl(originalUrl);

          if (response.status === 200) {
            navigate("/admin/short-url/" + response.data.hashUrl);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsBusy(false);
      }
    },
    [originalUrl]
  );

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOriginalUrl(event.target.value);
    },
    []
  );

  return (
    <div className="link-form-container">
      <form onSubmit={submitHandler}>
        <div className="ip-input-group">
          <input
            value={originalUrl}
            name="originalUrl"
            type="text"
            className="ip-input ip-input--text"
            placeholder="https://example.com"
            onChange={onChangeHandler}
          />
          <button className="ip-btn ip-btn--primary ip-input-btn" type="submit">
            {isBusy ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
