import { useEffect, useState } from "react";
import "./displayCards.scss";
import DisplayCard from "../DisplayCard";
import ErrorComp from "../ErrorComp";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";
import { TFinalEndpoint } from "../../enums/Endpoints";
import axios from "axios";
import EError from "../../enums/Error";
import ICharacters from "../../interfaces/Characters";
import IComics from "../../interfaces/Comics";
import IComicsWithCharacter from "../../interfaces/ComicsWithCharacter";

const DisplayCards = <T extends IComics | ICharacters | IComicsWithCharacter>({
  finalEndpoint,
}: {
  finalEndpoint: TFinalEndpoint;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const paramsKey =
    "params" in finalEndpoint && finalEndpoint.params
      ? finalEndpoint.params
      : "";
  let params = useParams()[paramsKey];

  // Gère le cas particulier où il y aurait une key "" dans le retour de useParams()
  params = paramsKey ? params : undefined;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          import.meta.env.VITE_BACK_END_URL +
          finalEndpoint.endpoint +
          (params ? params : "");

        const response = await axios.get(url);

        if (!finalEndpoint.validFunction(response.data)) {
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
  }, [params, finalEndpoint]);

  return (
    <main className="display-cards-component">
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <section className="display-cards-component-cards">
          {data &&
            ("results" in data ? data.results : data.comics).map(
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
                    handleClick={() => {
                      navigate("/comics/" + character._id);
                    }}
                  />
                );
              }
            )}
        </section>
      )}
    </main>
  );
};

export default DisplayCards;
