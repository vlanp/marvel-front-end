import "./characters.scss";
import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const Characters = () => {
  return (
    <DisplayCards
      finalEndpoint={EFinalEndpoint.CHARACTERS}
      filterFavorites={false}
    />
  );
};

export default Characters;
