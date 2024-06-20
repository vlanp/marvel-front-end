import { useEffect, useState } from "react";
import IComics, { isComics } from "../../interfaces/Comics";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EError from "../../enums/Error";
import Loading from "../../components/Loading";
import ErrorComp from "../../components/ErrorComp";
import DisplayCard from "../../components/DisplayCard";

const Comics = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IComics>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BACK_END_URL + "/comics";

        const response = await axios.get(url);

        if (!isComics(response.data)) {
          throw new Error("Réponse inatendue du BackEnd");
        }

        setData(response.data);
        setIsLoading(false);
      } catch (error: unknown) {
        console.log(error);
        setIsLoading(false);
        // Aucune validation d'arguments obligatoires n'est effectuée en back-end. Pas de distinction d'erreur.
        setErrorMessage(EError.UNKNOWN);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="comics-page">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <section className="comics-page-comics">
          {data?.results.map((comic) => {
            return (
              <DisplayCard
                key={comic._id}
                picture={comic.thumbnail.path}
                name={comic.title}
                description={comic.description}
                extension={comic.thumbnail.extension}
                handleClick={() => {
                  navigate("/comic/" + comic._id);
                }}
              />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Comics;
