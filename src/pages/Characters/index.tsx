import "./characters.scss";
import { useEffect, useState } from "react";
import ICharacters, { isCharacters } from "../../interfaces/Characters";
import EError from "../../enums/Error";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorComp from "../../components/ErrorComp";
import DisplayCard from "../../components/DisplayCard";

const Characters = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICharacters>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BACK_END_URL + "/characters";

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
  }, []);

  return (
    <main className="characters-page">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <section className="characters-page-characters">
          {data?.results.map((character) => {
            return (
              <DisplayCard
                key={character._id}
                picture={character.thumbnail.path}
                name={character.name}
                description={character.description}
                extension={character.thumbnail.extension}
              />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Characters;
