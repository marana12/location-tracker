import React, { useState, useEffect } from "react";
import { SearchLinkResult } from "../../models/link";
import AutoCompleteSearchInput from "../../models/autoCompleteInput";

interface AutoCompleteProps {
  //results: SearchLinkResult[];
  results: AutoCompleteSearchInput[];
  onSelect: (result: AutoCompleteSearchInput) => void;
  text?: string;
  isBusy: boolean;
  className?: string;
}

const AutoComplete = ({
  results,
  onSelect,
  text,
  isBusy = false,
  className,
}: AutoCompleteProps) => {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [searchResults, setSearchResults] =
    useState<AutoCompleteSearchInput[]>();
  const [isBusySearching, setIsBusySearching] = useState<boolean>();

  useEffect(() => {
    setSearchText(text);

    setSearchResults(results);

    setIsBusySearching(isBusy);

    return () => {
      setSearchResults([]);
      setSearchText("");
      setIsBusySearching(false);
    };
  });

  const handleSelect = (selected: AutoCompleteSearchInput) => {
    onSelect(selected.object);
  };

  return (
    <ul className={className}>
      {isBusySearching && (
        <li className="text-center">
          <div
            className="spinner-border text-secondary text-center"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </li>
      )}

      {searchResults?.map((result, index) => (
        <li key={index}>
          <button
            className="ip-btn ip-btn--link"
            onClick={() => handleSelect(result)}
            dangerouslySetInnerHTML={{ __html: result.displayText }}
          />
        </li>
      ))}
    </ul>
  );
};

export default AutoComplete;
