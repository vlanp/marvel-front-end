import { IComicResult } from "./Comics";

/** Get all informations of specific comic Route : /comic/:comicId */
interface IAboutAComic extends IComicResult {}

const isIAboutAComicWithDatas = (value: object): value is IAboutAComic => {
  if (
    "thumbnail" in value &&
    "_id" in value &&
    "title" in value &&
    "description" in value &&
    "__v" in value
  )
    return true;
  else return false;
};

export default IAboutAComic;
export { isIAboutAComicWithDatas };
