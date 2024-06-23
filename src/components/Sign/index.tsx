import "./sign.scss";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import ISign from "../../interfaces/Sign";
import EError from "../../enums/Error";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ESign from "../../enums/Sign";

const Sign = ({
  userToken,
  setUserToken,
  sign,
}: {
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
  sign: ESign;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    userToken && navigate("/");
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    if (sign === ESign.SignUp && confirmedPassword !== password) {
      return alert("Les 2 mots de passe ne correspondent pas");
    }
    if (password.length === 0) {
      return alert("Le mot de passe est vide");
    }
    if (sign === ESign.SignUp && username.length === 0) {
      return alert("Le nom d'utilisateur est vide");
    }
    const json = {
      email,
      username,
      password,
    };

    try {
      const response = await axios.post<ISign>(
        import.meta.env.VITE_BACK_END_URL + "/user/" + sign,
        json
      );
      console.log(import.meta.env.VITE_BACK_END_URL);

      if ("_id" in response.data && "token" in response.data) {
        Cookies.set("userToken", response.data.token);
        setUserToken(response.data.token);
        sign === ESign.SignUp
          ? navigate("/user/account-validation", { state: { email } })
          : navigate("/");
      } else {
        throw new Error(EError.UNKNOWN);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setErrorMessage("Un compte existe déjà avec cette adresse email.");
        } else if (error.response?.status === 406) {
          setErrorMessage(
            "Mot de passe non valide. Votre mot de passe doit contenir au moins 8 charatères avec au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 symbol"
          );
        } else if (error.response?.status === 404) {
          setErrorMessage("Email et / ou mot de passe incorrect");
        }
      } else {
        setErrorMessage(EError.UNKNOWN);
      }
    }
  };

  return (
    <main className="sign-component">
      <form onSubmit={handleSubmit}>
        <h3 className="sign-component-form-title">
          {sign === ESign.SignUp ? "S'inscrire" : "Se connecter"}
        </h3>
        <div>
          {sign === ESign.SignUp && (
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          {sign === ESign.SignUp && (
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmedPassword}
              onChange={(event) => {
                setConfirmedPassword(event.target.value);
              }}
            />
          )}
        </div>
        {sign === ESign.SignUp && (
          <div>
            <p className="sign-component-condition">
              En m'inscrivant, je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité. Je confirme avoir au
              moins 18 ans.
            </p>
          </div>
        )}
        <div className="sign-component-confirm">
          {errorMessage && (
            <p className="sign-up-error-message">{errorMessage}</p>
          )}
          <button>
            {sign === ESign.SignUp ? "S'inscrire" : "Se connecter"}
          </button>
          <p
            className="sign-component-switch"
            onClick={() => {
              navigate(
                "/user/" + (sign === ESign.SignUp ? "signin" : "signup")
              );
            }}
          >
            {sign === ESign.SignUp
              ? "Tu as déjà un compte ? Connecte-toi !"
              : "Pas encore de compte ? Inscris-toi !"}
          </p>
        </div>
      </form>
    </main>
  );
};

export default Sign;
