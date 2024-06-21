import { ICharacterResult } from "./Characters";

/** Get a the infos of a specific character Route : /character/:characterId */
interface IAboutACharacter extends ICharacterResult {}

const isIAboutACharacterWithDatas = (
  value: object
): value is IAboutACharacter => {
  if (
    "thumbnail" in value &&
    "comics" in value &&
    Array.isArray(value.comics) &&
    value.comics.length > 0 &&
    "_id" in value &&
    "name" in value &&
    "description" in value &&
    "__v" in value
  )
    return true;
  else return false;
};

export default IAboutACharacter;
export { isIAboutACharacterWithDatas };
