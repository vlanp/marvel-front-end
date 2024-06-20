import { isAboutACharacter } from "../interfaces/AboutACharacter";
import { isAboutAComic } from "../interfaces/AboutAComic";
import { isCharacters } from "../interfaces/Characters";
import { isComics } from "../interfaces/Comics";

enum EEndpointName {
  CHARACTERS = "CHARACTERS",
  COMICS = "COMICS",
  COMICS_WITH_CHARACTER = "COMICS_WITH_CHARACTER",
  CHARACTERS_WITHIN_COMIC = "CHARACTERS_WITHIN_COMIC",
}

const EFinalEndpoint: IFinalEndpoint = {
  /** Get a list of characters */
  CHARACTERS: {
    endpoint: "/characters/",
    validFunction: isCharacters,
    linkTo: EEndpointName.COMICS_WITH_CHARACTER,
  },
  /** Get a list of comics */
  COMICS: {
    endpoint: "/comics/",
    validFunction: isComics,
    linkTo: EEndpointName.CHARACTERS_WITHIN_COMIC,
  },
  /** Get a list of comics containing a specific character */
  COMICS_WITH_CHARACTER: {
    endpoint: "/comics/",
    params: "characterid",
    validFunction: isAboutACharacter,
    linkTo: EEndpointName.CHARACTERS_WITHIN_COMIC,
  },
  /** Get a list of characters present in a specific comic */
  CHARACTERS_WITHIN_COMIC: {
    endpoint: "/characters/",
    params: "comicid",
    validFunction: isAboutAComic,
    linkTo: EEndpointName.COMICS_WITH_CHARACTER,
  },
} as const;

type TFinalEndpoint = (typeof EFinalEndpoint)[keyof typeof EFinalEndpoint];

type IFinalEndpoint = {
  [key in EEndpointName]: {
    endpoint: string;
    params?: string;
    query?: string;
    body?: string;
    validFunction: (data: unknown) => boolean;
    linkTo: EEndpointName;
  };
};

export default EFinalEndpoint;
export type { TFinalEndpoint };
