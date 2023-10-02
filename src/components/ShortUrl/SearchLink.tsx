import React, { useState, useCallback } from "react";
import { CreateShortUrl, SearchLinks } from "../../Services/APIs/LinksAPI";
import { useNavigate } from "react-router-dom";
import { SearchLinkResult } from "../../models/link";
import AutoCompleteSearchInput from "../../models/autoCompleteInput";
import InputAutoComplete from "../Utils/Inputs/InputAutoComplete";
import "../../styles/search-link.scss";

const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export default function SearchLink() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchLinkResult[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isBusySearching, setIsBusySearching] = useState(false);
  const [isValidForm, setIsVaLidForm] = useState(true);

  const navigate = useNavigate();

  const submitHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValid = urlPattern.test(searchText);

      setIsVaLidForm(isValid);

      try {
        if (searchText && isValid) {
          setIsBusy(true);
          const response = await CreateShortUrl(searchText);

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
    [searchText]
  );

  const onChange = async (
    value: string
  ): Promise<AutoCompleteSearchInput[] | undefined> => {
    setSearchText(value);
    setIsVaLidForm(true);

    if (value === "") {
      return;
    }

    setIsBusySearching(true);

    try {
      var response = await SearchLinks(value);

      if (response.data) {
        setSearchResults(response.data);

        const data = response.data.map((item: SearchLinkResult) => {
          return {
            object: item,
            text: item.highlightedText,
            displayText: item.highlightedText,
          } as AutoCompleteSearchInput;
        });

        return data;
      }
    } catch (error) {
      setSearchResults([]);

      throw error;
    } finally {
      setIsBusySearching(false);
    }
  };

  const handleSelectResult = (selected: SearchLinkResult) => {
    navigate("/admin/short-url/" + selected.hashUrl);
  };

  const isNotFound = useCallback(() => {
    return (
      searchResults.length === 0 && searchText?.length > 0 && !isBusySearching
    );
  }, [searchResults, isBusySearching, searchText]);

  return (
    <div className="link-form-container">
      <form onSubmit={submitHandler}>
        <InputAutoComplete
          onSelectResult={handleSelectResult}
          inputProps={{
            value: searchText,
            name: "originalUrl",
            placeHolder: "https://example.com",
            changeHandler: onChange,
          }}
        />

        {!isValidForm && <p className="error-message"> Invalid URL</p>}

        {isNotFound() && (
          <button className="ip-btn ip-btn--secondary" type="submit">
            {isBusy ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        )}
      </form>
    </div>
  );
}
