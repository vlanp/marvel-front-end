import { useParams } from "react-router-dom";
import "./comicsWithCharacter.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import IComicsWithCharacter, {
  isComicsWithCharacter,
} from "../../interfaces/ComicsWithCharacter";
import EError from "../../enums/Error";
import Loading from "../../components/Loading";
import ErrorComp from "../../components/ErrorComp";
import DisplayCard from "../../components/DisplayCard";

const ComicsWithCharacter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IComicsWithCharacter>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { characterid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          import.meta.env.VITE_BACK_END_URL + "/comics/" + characterid;

        const response = await axios.get(url);

        if (!isComicsWithCharacter(response.data)) {
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
  }, [characterid]);

  return (
    <main className="comics-with-character-page">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <section className="comics-with-character-page-comics">
          {data?.comics.map((comic) => {
            return (
              <DisplayCard
                key={comic._id}
                picture={comic.thumbnail.path}
                name={comic.title}
                description={comic.description}
                extension={comic.thumbnail.extension}
                handleClick={() => {}}
              />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default ComicsWithCharacter;
