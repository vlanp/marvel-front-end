import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const Comics = () => {
  return (
    <main>
      <DisplayCards
        finalEndpoint={EFinalEndpoint.COMICS}
        filterFavorites={false}
      />
    </main>
  );
};

export default Comics;
