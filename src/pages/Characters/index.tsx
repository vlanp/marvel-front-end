import "./characters.scss";
import { useEffect, useState } from "react";
import ICharacters, { isCharacters } from "../../interfaces/Characters";
import IError from "../../interfaces/Error";
import EError from "../../enums/Error";
import axios from "axios";
import Loading from "../../components/Loading";

const Characters = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICharacters>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BACK_END_URL + "/characters";
        console.log(url);

        const response = await axios.get(url);

        if (!isCharacters(response.data)) {
          throw {};
        }

        setData(response.data);
        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(false);
        setErrorMessage((error as IError).message || EError.UNKNOWN);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="characters-page">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Characters;
