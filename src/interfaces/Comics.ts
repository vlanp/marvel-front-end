import IThumbnail from "./Thumbnail";

/** Get a list of comics Route: /comics */
interface IComics {
  count: number;
  limit: number;
  results: Array<IComicResult> | [];
}

interface IComicResult {
  thumbnail: IComicThumbnail;
  _id: string;
  title: string;
  description: string;
  __v: number;
}

interface IComicThumbnail extends IThumbnail {}

const isIComicsWithDatas = (value: object): value is IComics => {
  if (
    "count" in value &&
    "limit" in value &&
    "results" in value &&
    Array.isArray(value.results) &&
    value.results.length > 0 &&
    "thumbnail" in value.results[0] &&
    "_id" in value.results[0] &&
    "title" in value.results[0] &&
    "description" in value.results[0] &&
    "__v" in value.results[0]
  )
    return true;
  else return false;
};

export default IComics;
export type { IComicResult, IComicThumbnail };
export { isIComicsWithDatas };
