import { useEffect, useState } from "react";
import "./displayCards.scss";
import DisplayCard from "../DisplayCard";
import ErrorComp from "../ErrorComp";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";
import EFinalEndpoint, { TFinalEndpoint } from "../../enums/Endpoints";
import axios, { AxiosResponse } from "axios";
import EError from "../../enums/Error";
import ICharacters, {
  isICharactersWithDatas,
} from "../../interfaces/Characters";
import IComics from "../../interfaces/Comics";
import IComicsWithCharacter from "../../interfaces/ComicsWithCharacter";
import IAboutACharacter from "../../interfaces/AboutACharacter";
import IAboutAComic from "../../interfaces/AboutAComic";
import EPictureFormat from "../../enums/PictureFormat";

const DisplayCards = <
  T extends IComics | ICharacters | IComicsWithCharacter,
  D extends IAboutACharacter | IAboutAComic
>({
  finalEndpoint,
}: {
  finalEndpoint: TFinalEndpoint;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data1, setData1] = useState<T>();
  const [data2, setData2] = useState<D>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const paramsKey =
    finalEndpoint.endpoint2 && finalEndpoint.endpoint2.params
      ? finalEndpoint.endpoint2.params
      : "";
  console.log(finalEndpoint);
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
          (params ? params : "");
        // console.log(url1);
        // console.log(params);

        const url2 =
          finalEndpoint.endpoint2 &&
          params &&
          import.meta.env.VITE_BACK_END_URL +
            finalEndpoint.endpoint2.endpoint +
            params;
        // console.log(url2);

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

        if (!finalEndpoint.endpoint1.isData(data1)) {
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
    fetchData();
  }, [params, finalEndpoint]);

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
                handleClick={() => {}}
              />
            )}
          </section>
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
                      handleClick={() => {
                        navigate(navigationTarget + character._id);
                      }}
                    />
                  );
                }
              )}
          </section>
        </section>
      )}
    </section>
  );
};

export default DisplayCards;
