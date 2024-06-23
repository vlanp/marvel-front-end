import { useEffect, useState } from "react";
import EFinalEndpoint, { EEndpointName } from "../../enums/Endpoints";
import "./favorites.scss";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import IAboutAComic, {
  isIAboutAComicWithDatas,
} from "../../interfaces/AboutAComic";
import IAboutACharacter, {
  isIAboutACharacterWithDatas,
} from "../../interfaces/AboutACharacter";
import Loading from "../../components/Loading";
import EError from "../../enums/Error";
import ErrorComp from "../../components/ErrorComp";
import DisplayCards from "../../components/DisplayCards";

const Favorites = () => {
  const [category, setCategory] = useState<
    EEndpointName.COMICS | EEndpointName.CHARACTERS
  >(EEndpointName.COMICS);
  const [data, setData] = useState<
    Array<IAboutACharacter> | Array<IAboutAComic>
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteInCookies = Cookies.get("favorite" + category);
        const parsedFavoriteInCookies =
          favoriteInCookies && JSON.parse(favoriteInCookies);
        const cookiesIsArray = Array.isArray(parsedFavoriteInCookies);

        const arrayOfPromises: Array<
          | Promise<AxiosResponse<IAboutACharacter>>
          | Promise<AxiosResponse<IAboutAComic>>
        > = [];

        if (cookiesIsArray && category === EEndpointName.CHARACTERS) {
          parsedFavoriteInCookies.forEach((favoriteId) => {
            const url =
              import.meta.env.VITE_BACK_END_URL + "/character/" + favoriteId;
            arrayOfPromises.push(axios.get<IAboutACharacter>(url));
          });
        } else if (cookiesIsArray && category === EEndpointName.COMICS) {
          parsedFavoriteInCookies.forEach((favoriteId) => {
            const url =
              import.meta.env.VITE_BACK_END_URL + "/comic/" + favoriteId;
            arrayOfPromises.push(axios.get<IAboutAComic>(url));
          });
        }

        const responseList = await Promise.all(arrayOfPromises);

        const dataList = responseList.map((response) => response.data);

        let aboutACharacterList: Array<IAboutACharacter>;
        let aboutAComicList: Array<IAboutAComic>;
        if (category === EEndpointName.CHARACTERS) {
          aboutACharacterList = dataList.filter(
            (data): data is IAboutACharacter =>
              isIAboutACharacterWithDatas(data)
          );
          setData(aboutACharacterList);
        } else {
          aboutAComicList = dataList.filter((data): data is IAboutAComic =>
            isIAboutAComicWithDatas(data)
          );
          setData(aboutAComicList);
        }
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(EError.UNKNOWN);
      }
    };
    fetchData();
  }, [category]);

  return isLoading ? (
    <Loading />
  ) : errorMessage ? (
    <ErrorComp error={errorMessage} />
  ) : (
    <main className="favorites-page container">
      <nav>
        <h3
          className={
            category === EEndpointName.COMICS ? "favorites-page-selected" : ""
          }
          onClick={() => {
            setCategory(EEndpointName.COMICS);
          }}
        >
          Mes comics
        </h3>
        <h3
          className={
            category === EEndpointName.CHARACTERS
              ? "favorites-page-selected"
              : ""
          }
          onClick={() => setCategory(EEndpointName.CHARACTERS)}
        >
          Mes personnages
        </h3>
      </nav>
      <DisplayCards
        data={data}
        filterFavorites={true}
        finalEndpoint={
          category === EEndpointName.CHARACTERS
            ? EFinalEndpoint.CHARACTERS
            : EFinalEndpoint.COMICS
        }
      />
    </main>
  );
};

export default Favorites;
