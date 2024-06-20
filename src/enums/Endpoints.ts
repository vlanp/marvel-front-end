import { isAboutACharacter } from "../interfaces/AboutACharacter";
import { isAboutAComic } from "../interfaces/AboutAComic";
import { isCharacters } from "../interfaces/Characters";
import { isComics } from "../interfaces/Comics";

const EFinalEndpoint: IFinalEndpoint = {
  /** Get a list of characters */
  CHARACTERS: { endpoint: "/characters", validFunction: isCharacters },
  /** Get a list of comics */
  COMICS: { endpoint: "/comics", validFunction: isComics },
  /** Get a list of comics containing a specific character */
  COMICS_WITH_CHARACTER: {
    endpoint: "/comics/",
    params: "characterid",
    validFunction: isAboutACharacter,
  },
  /** Get a list of characters present in a specific comic */
  CHARACTERS_WITHIN_COMIC: {
    endpoint: "/characters/",
    params: "comicid",
    validFunction: isAboutAComic,
  },
} as const;

type TFinalEndpoint = (typeof EFinalEndpoint)[keyof typeof EFinalEndpoint];

interface IFinalEndpoint {
  [key: string]: {
    endpoint: string;
    params?: string;
    query?: string;
    body?: string;
    validFunction: (data: unknown) => boolean;
  };
}

export default EFinalEndpoint;
export type { TFinalEndpoint };
