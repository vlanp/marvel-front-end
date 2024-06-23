import { Dispatch, SetStateAction } from "react";
import "./searchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({
  search,
  setSearch,
  placeholder,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <div className={"search-bar-component"}>
      <FontAwesomeIcon icon={"magnifying-glass"} />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
