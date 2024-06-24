import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const ComicsWithCharacter = () => {
  return (
    <main>
      <DisplayCards
        finalEndpoint={EFinalEndpoint.COMICS_WITH_CHARACTER}
        filterFavorites={false}
      />
    </main>
  );
};

export default ComicsWithCharacter;
