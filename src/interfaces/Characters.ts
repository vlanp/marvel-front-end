import IThumbnail from "./Thumbnail";

/** Get a list of characters Route : /characters */
interface ICharacters {
  count: number;
  limit: number;
  results: Array<ICharacterResult> | [];
}

interface ICharacterResult {
  thumbnail: ICharacterThumbnail;
  comics: Array<string>;
  _id: string;
  name: string;
  description: string;
  __v: number;
}

interface ICharacterThumbnail extends IThumbnail {}

const isICharactersWithDatas = (value: object): value is ICharacters => {
  if (
    "count" in value &&
    "limit" in value &&
    "results" in value &&
    Array.isArray(value.results) &&
    value.results.length > 0 &&
    "thumbnail" in value.results[0] &&
    "comics" in value.results[0] &&
    "_id" in value.results[0] &&
    "name" in value.results[0] &&
    "description" in value.results[0] &&
    "__v" in value.results[0]
  )
    return true;
  else return false;
};

export default ICharacters;
export type { ICharacterResult, ICharacterThumbnail };
export { isICharactersWithDatas };
