import React, { useState, useCallback } from "react";
import { CreateShortUrl } from "../../Services/APIs/LinksAPI";
import { useNavigate } from "react-router-dom";

export default function LinkForm({}) {
  const [isBusy, setIsBusy] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>();
  const navigate = useNavigate();

  const submitHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(originalUrl);
      setIsBusy(true);
      try {
        if (originalUrl) {
          const response = await CreateShortUrl(originalUrl);

          if (response.status === 200) {
            console.log(response.data);
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
      console.log(event.target.value);
      setOriginalUrl(event.target.value);
    },
    []
  );

  return (
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
  );
}
