import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const CharactersWithinComic = () => {
  return (
    <DisplayCards finalEndpoint={EFinalEndpoint.CHARACTERS_WITHIN_COMIC} />
  );
};

export default CharactersWithinComic;
