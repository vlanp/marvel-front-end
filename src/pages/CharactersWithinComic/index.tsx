import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const CharactersWithinComic = () => {
  return (
    <main>
      <DisplayCards
        finalEndpoint={EFinalEndpoint.CHARACTERS_WITHIN_COMIC}
        filterFavorites={false}
      />
    </main>
  );
};

export default CharactersWithinComic;
