import AutoComplete from "../AutoComplete";
import AutoCompleteSearchInput from "../../../models/autoCompleteInput";
import "../../../styles/common/inputs/input-autocomplete.scss";
import { useEffect, useState } from "react";
interface InputProps {
  value?: string | undefined;
  name?: string;
  className?: string;
  placeHolder?: string;
  changeHandler?: (
    text: string
  ) => Promise<AutoCompleteSearchInput[] | undefined>;
}

interface InputAutoCompleteProps {
  inputProps: InputProps;
  onSelectResult: (selected: any) => void;
}
const InputAutoComplete = ({
  inputProps,
  onSelectResult,
}: InputAutoCompleteProps) => {
  const [isBusySearching, setIsBusySearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [results, setResults] = useState<AutoCompleteSearchInput[]>([]);

  const { value, name, placeHolder, changeHandler } = inputProps;

  useEffect(() => {
    setSearchText(value);
  });

  const handleSelectResult = (selected: any) => {
    setIsSelected(true);
    setResults([]);
    onSelectResult(selected);
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setIsSelected(false);

    setSearchText(value);

    setIsBusySearching(true);

    changeHandler?.(value)
      .then((response: AutoCompleteSearchInput[] | undefined) => {
        if (response) {
          setResults(response);
        } else {
          setResults([]);
        }
      })
      .catch(() => setResults([]))
      .finally(() => setIsBusySearching(false));
  };

  return (
    <div className="ip-input-autocomplete">
      <input
        value={searchText}
        name={name}
        type="text"
        className="ip-input ip-input-autocomplete__text"
        placeholder={placeHolder}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {searchText &&
        searchText.length > 0 &&
        results?.length > 0 &&
        !isSelected && (
          <AutoComplete
            onSelect={handleSelectResult}
            isBusy={isBusySearching}
            text={searchText}
            results={results}
            className="ip-input-autocomplete__dropdown"
          />
        )}
    </div>
  );
};

export default InputAutoComplete;
