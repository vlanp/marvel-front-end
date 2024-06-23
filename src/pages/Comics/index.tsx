import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const Comics = () => {
  return (
    <DisplayCards
      finalEndpoint={EFinalEndpoint.COMICS}
      filterFavorites={false}
    />
  );
};

export default Comics;
