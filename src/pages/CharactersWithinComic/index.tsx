import { useEffect, useState } from "react";
import "./charactersWithinComic.scss";
import ICharacters, { isCharacters } from "../../interfaces/Characters";
import { useParams } from "react-router-dom";
import axios from "axios";
import EError from "../../enums/Error";
import Loading from "../../components/Loading";
import ErrorComp from "../../components/ErrorComp";
import DisplayCard from "../../components/DisplayCard";

const CharactersWithinComic = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICharacters>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { comicid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          import.meta.env.VITE_BACK_END_URL + "/characters/" + comicid;

        const response = await axios.get(url);

        if (!isCharacters(response.data)) {
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
  }, [comicid]);

  return (
    <main className="characters-within-comic-page">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <section className="characters-within-comic-page-character">
          {data?.results.map((character) => {
            return (
              <DisplayCard
                key={character._id}
                picture={character.thumbnail.path}
                name={character.name}
                description={character.description}
                extension={character.thumbnail.extension}
                handleClick={() => {}}
              />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default CharactersWithinComic;
