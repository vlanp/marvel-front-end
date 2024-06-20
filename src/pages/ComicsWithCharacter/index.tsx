import DisplayCards from "../../components/DisplayCards";
import EFinalEndpoint from "../../enums/Endpoints";

const ComicsWithCharacter = () => {
  return <DisplayCards finalEndpoint={EFinalEndpoint.COMICS_WITH_CHARACTER} />;
};

export default ComicsWithCharacter;
