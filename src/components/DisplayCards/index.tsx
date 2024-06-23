import { useEffect, useState } from "react";
import "./displayCards.scss";
import DisplayCard from "../DisplayCard";
import ErrorComp from "../ErrorComp";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";
import EFinalEndpoint, {
  EEndpointName,
  TFinalEndpoint,
} from "../../enums/Endpoints";
import axios, { AxiosResponse } from "axios";
import EError from "../../enums/Error";
import ICharacters from "../../interfaces/Characters";
import IComics from "../../interfaces/Comics";
import IComicsWithCharacter from "../../interfaces/ComicsWithCharacter";
import IAboutACharacter from "../../interfaces/AboutACharacter";
import IAboutAComic from "../../interfaces/AboutAComic";
import EPictureFormat from "../../enums/PictureFormat";
import PageHandling from "../PageHandling";
import SearchBar from "../SearchBar";

const DisplayCards = <
  T extends IComics | ICharacters | IComicsWithCharacter,
  D extends IAboutACharacter | IAboutAComic
>({
  finalEndpoint,
  filterFavorites,
  data,
}: {
  finalEndpoint: TFinalEndpoint;
  filterFavorites: boolean;
  data?: IAboutACharacter[] | IAboutAComic[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data1, setData1] = useState<T>();
  const [data2, setData2] = useState<D>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [maxPage, setMaxPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const paramsKey =
    finalEndpoint.endpoint2 && finalEndpoint.endpoint2.params
      ? finalEndpoint.endpoint2.params
      : "";
  let params = useParams()[paramsKey];

  // Gère le cas particulier où il y aurait une key "" dans le retour de useParams()
  params = paramsKey ? params : undefined;

  const navigate = useNavigate();
  const navigationFinalEndpoint = EFinalEndpoint[finalEndpoint.linkTo];
  const navigationTarget = navigationFinalEndpoint.endpoint1.endpoint;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url1 =
          import.meta.env.VITE_BACK_END_URL +
          finalEndpoint.endpoint1.endpoint +
          (params ? params : "") +
          "?skip=" +
          100 * (currentPage - 1) +
          (search
            ? "&" + finalEndpoint.endpoint1.specificQueryName + "=" + search
            : "");

        console.log(url1);
        console.log(import.meta.env.VITE_BACK_END_URL);

        const url2 =
          finalEndpoint.endpoint2 &&
          params &&
          import.meta.env.VITE_BACK_END_URL +
            finalEndpoint.endpoint2.endpoint +
            params;

        const arrayOfPromises: [
          Promise<AxiosResponse<T>>,
          Promise<AxiosResponse<D>>?
        ] = [axios.get<T>(url1)];

        if (url2) {
          arrayOfPromises.push(axios.get<D>(url2));
        }

        const responseList = await Promise.all(arrayOfPromises);

        const data1 = responseList[0].data;

        const data2 = responseList[1] && responseList[1].data;

        if (!finalEndpoint.endpoint1.isData(data1) && !search) {
          console.log(data1);
          throw new Error(
            finalEndpoint.errorMessage +
              (!data2
                ? ""
                : "name" in data2
                ? " " + data2.name
                : " " + data2.title)
          );
        }

        if (
          finalEndpoint.endpoint2 &&
          (!data2 || !finalEndpoint.endpoint2.isData(data2))
        ) {
          console.log(data2);
          throw new Error(EError.UNKNOWN);
        }
        if ("count" in data1) {
          setMaxPage(Math.ceil(data1.count / 100));
        }
        setData1(data1);
        setData2(data2);
        setIsLoading(false);
      } catch (error: unknown) {
        console.log(error);
        setIsLoading(false);
        error instanceof Error
          ? setErrorMessage(error.message)
          : setErrorMessage(EError.UNKNOWN);
      }
    };
    if (!filterFavorites) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [params, finalEndpoint, currentPage, search, filterFavorites]);

  return (
    <section className="display-cards-component">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <section className="container">
          <h3>
            {finalEndpoint.pageTitle +
              (!data2
                ? ""
                : "name" in data2
                ? " " + data2.name
                : " " + data2.title)}
          </h3>
          <section className="display-cards-component-card">
            {data2 && (
              <DisplayCard
                picture={data2.thumbnail.path}
                name={"name" in data2 ? data2.name : data2.title}
                description={data2.description}
                extension={data2.thumbnail.extension}
                format={EPictureFormat.PortraitUncanny}
                id={data2._id}
                type={
                  finalEndpoint.linkTo === EEndpointName.CHARACTERS_WITHIN_COMIC
                    ? EEndpointName.CHARACTERS
                    : EEndpointName.COMICS
                }
                handleClick={() => {}}
              />
            )}
          </section>
          {!filterFavorites && (
            <section className="display-cards-component-search-bar">
              <SearchBar
                search={search}
                setSearch={setSearch}
                placeholder={finalEndpoint.searchBarPlaceholder}
              />
            </section>
          )}
          {!filterFavorites && (
            <section className="display-cards-component-cards">
              {data1 &&
                ("results" in data1 ? data1.results : data1.comics).map(
                  (character) => {
                    return (
                      <DisplayCard
                        key={character._id}
                        picture={character.thumbnail.path}
                        name={
                          "name" in character ? character.name : character.title
                        }
                        description={character.description}
                        extension={character.thumbnail.extension}
                        format={EPictureFormat.PortraitIncredible}
                        id={character._id}
                        type={
                          finalEndpoint.linkTo ===
                          EEndpointName.COMICS_WITH_CHARACTER
                            ? EEndpointName.CHARACTERS
                            : EEndpointName.COMICS
                        }
                        handleClick={() => {
                          navigate(navigationTarget + character._id);
                        }}
                      />
                    );
                  }
                )}
            </section>
          )}
          {filterFavorites && (
            <section className="display-cards-component-cards">
              {data &&
                data.map((characterOrComic) => {
                  return (
                    <DisplayCard
                      key={characterOrComic._id}
                      picture={characterOrComic.thumbnail.path}
                      name={
                        "name" in characterOrComic
                          ? characterOrComic.name
                          : characterOrComic.title
                      }
                      description={characterOrComic.description}
                      extension={characterOrComic.thumbnail.extension}
                      format={EPictureFormat.PortraitIncredible}
                      id={characterOrComic._id}
                      type={
                        finalEndpoint.linkTo ===
                        EEndpointName.COMICS_WITH_CHARACTER
                          ? EEndpointName.CHARACTERS
                          : EEndpointName.COMICS
                      }
                      handleClick={() => {
                        navigate(navigationTarget + characterOrComic._id);
                      }}
                    />
                  );
                })}
            </section>
          )}
          {maxPage > 1 && (
            <PageHandling
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
              setIsLoading={setIsLoading}
            />
          )}
        </section>
      )}
    </section>
  );
};

export default DisplayCards;
