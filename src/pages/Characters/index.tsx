import "./characters.scss";
import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const Characters = () => {
  return (
    <main>
      <DisplayCards
        finalEndpoint={EFinalEndpoint.CHARACTERS}
        filterFavorites={false}
      />
    </main>
  );
};

export default Characters;
