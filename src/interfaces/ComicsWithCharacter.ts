import { ICharacterThumbnail } from "./Characters";
import { IComicResult } from "./Comics";

/** Get a list of comics containing a specific character Route: /comics/:characterId */
interface IComicsWithCharacter {
  thumbnail: ICharacterThumbnail;
  comics: Array<IComicResult> | [];
}

const isIComicsWithCharacterWithDatas = (
  value: object
): value is IComicsWithCharacter => {
  if (
    "thumbnail" in value &&
    "comics" in value &&
    Array.isArray(value.comics) &&
    value.comics.length > 0 &&
    "thumbnail" in value.comics[0] &&
    "_id" in value.comics[0] &&
    "title" in value.comics[0] &&
    "description" in value.comics[0] &&
    "__v" in value.comics[0]
  )
    return true;
  else return false;
};

export default IComicsWithCharacter;
export { isIComicsWithCharacterWithDatas };
