import { ICharacterThumbnail } from "./Characters";
import { IComicResult } from "./Comics";

/** Get a list of comics containing a specific character Route: /comics/:characterId */
interface IComicsWithCharacter {
  thumbnail: ICharacterThumbnail;
  comics: Array<IComicResult>;
}

const isComicsWithCharacter = (value: unknown) => {
  if ((value as IComicsWithCharacter).thumbnail) return true;
  else return false;
};

export default IComicsWithCharacter;
export { isComicsWithCharacter };
