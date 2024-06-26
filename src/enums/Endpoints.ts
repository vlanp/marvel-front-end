import { isIAboutACharacterWithDatas } from "../interfaces/AboutACharacter";
import { isIAboutAComicWithDatas } from "../interfaces/AboutAComic";
import { isICharactersWithDatas } from "../interfaces/Characters";
import { isIComicsWithDatas } from "../interfaces/Comics";
import { isIComicsWithCharacterWithDatas } from "../interfaces/ComicsWithCharacter";
import EError from "./Error";

enum EEndpointName {
  CHARACTERS = "CHARACTERS",
  COMICS = "COMICS",
  COMICS_WITH_CHARACTER = "COMICS_WITH_CHARACTER",
  CHARACTERS_WITHIN_COMIC = "CHARACTERS_WITHIN_COMIC",
}

enum ESpecificQueryName {
  TITLE = "title",
  NAME = "name",
}

const EFinalEndpoint: IFinalEndpoint = {
  /** Get a list of characters */
  CHARACTERS: {
    pageTitle: "Voici la liste de tous les personnages",
    searchBarPlaceholder: "Recherche un personnage",
    errorMessage: EError.UNKNOWN,
    endpoint1: {
      endpoint: "/characters/",
      specificQueryName: ESpecificQueryName.NAME,
      isData: isICharactersWithDatas,
    },
    linkTo: EEndpointName.COMICS_WITH_CHARACTER,
  },
  /** Get a list of comics */
  COMICS: {
    pageTitle: "Voici la liste de tous les comics",
    searchBarPlaceholder: "Recherche un comic",
    errorMessage: EError.UNKNOWN,
    endpoint1: {
      endpoint: "/comics/",
      specificQueryName: ESpecificQueryName.TITLE,
      isData: isIComicsWithDatas,
    },
    linkTo: EEndpointName.CHARACTERS_WITHIN_COMIC,
  },
  /** Get a list of comics containing a specific character */
  COMICS_WITH_CHARACTER: {
    pageTitle:
      "Voici la liste de tous les comics dans lesquels apparait le personnage",
    searchBarPlaceholder: "Recherche un comic",
    errorMessage: "Il n'y a aucun comic associé au personnage",
    endpoint1: {
      endpoint: "/comics/",
      specificQueryName: ESpecificQueryName.TITLE,
      isData: isIComicsWithCharacterWithDatas,
    },
    endpoint2: {
      endpoint: "/character/",
      params: "characterid",
      isData: isIAboutACharacterWithDatas,
    },
    linkTo: EEndpointName.CHARACTERS_WITHIN_COMIC,
  },
  /** Get a list of characters present in a specific comic */
  CHARACTERS_WITHIN_COMIC: {
    pageTitle: "Voici la liste de tous les personnages présents dans le comic",
    searchBarPlaceholder: "Recherche un personnage",
    errorMessage: "Il n'y a aucun personnage associé au comic",
    endpoint1: {
      endpoint: "/characters/",
      specificQueryName: ESpecificQueryName.NAME,
      isData: isICharactersWithDatas,
    },
    endpoint2: {
      endpoint: "/comic/",
      params: "comicid",
      isData: isIAboutAComicWithDatas,
    },
    linkTo: EEndpointName.COMICS_WITH_CHARACTER,
  },
} as const;

type TFinalEndpoint = (typeof EFinalEndpoint)[keyof typeof EFinalEndpoint];

type IFinalEndpoint = {
  [key in EEndpointName]: {
    pageTitle: string;
    searchBarPlaceholder: string;
    errorMessage: string;
    endpoint1: {
      endpoint: string;
      specificQueryName: ESpecificQueryName;
      isData: (data: object) => boolean;
    };
    endpoint2?: {
      endpoint: string;
      params: string;
      isData: (data: object) => boolean;
    };
    // query?: string;
    // body?: string;
    linkTo: EEndpointName;
  };
};

export default EFinalEndpoint;
export type { TFinalEndpoint };
export { EEndpointName };
