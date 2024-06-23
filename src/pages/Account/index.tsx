import "./account.scss";
import { FormEvent, useEffect, useState } from "react";
import AccountData from "../../interfaces/AccountData";
import axios from "axios";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EError from "../../enums/Error";
import ErrorComp from "../../components/ErrorComp";

const Account = ({ userToken }: { userToken: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<AccountData>();
  const [modifyUsername, setModifyUsername] = useState<boolean>(false);
  const [modifyAvatar, setModifyAvatar] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setErrorMessage("");
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACK_END_URL + "/user/account",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data?.account.username) {
          setData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          throw new Error(EError.UNKNOWN);
        }
      } catch (error: unknown) {
        setIsLoading(false);
        console.log(error);
        setErrorMessage(EError.UNKNOWN);
      }
    };
    fetchData();
  }, [userToken]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModifyAvatar(false);
    setModifyUsername(false);
    setAvatar(null);
    setUsername("");
    try {
      const formData = new FormData();
      modifyAvatar && avatar && formData.append("avatar", avatar);
      modifyUsername && username && formData.append("username", username);
      const response = await axios.patch(
        import.meta.env.VITE_BACK_END_URL + "/user/account",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data?.account.username) {
        console.log(response.data);
        setData(response.data);
      } else {
        throw new Error(EError.UNKNOWN);
      }
    } catch (error: unknown) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage(EError.UNKNOWN);
    }
  };

  return (
    <main className="my-account">
      {" "}
      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <ErrorComp error={errorMessage} />
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMessage ? (
            <p className="my-account-error-message">{errorMessage}</p>
          ) : (
            <>
              <div>
                <p>Nom d'utilisateur</p>
                <div>
                  <FontAwesomeIcon
                    onClick={() => {
                      setModifyUsername(!modifyUsername);
                    }}
                    className={
                      "account-modify-icon" +
                      (modifyUsername ? " account-icon-red" : "")
                    }
                    icon={"pen"}
                  />
                  {modifyUsername ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  ) : (
                    <p>{data?.account.username}</p>
                  )}
                </div>
              </div>
              <div>
                <p>Email</p>
                <p>{data?.account.email}</p>
              </div>
              <div>
                <p>Compte activé</p>
                <p>{data?.active ? "Oui" : "Non"}</p>
              </div>
              <div className="account-profile-avatar">
                <p>Photo de profil</p>
                <div>
                  <FontAwesomeIcon
                    className={
                      "account-modify-icon" +
                      (modifyAvatar ? " account-icon-red" : "")
                    }
                    onClick={() => {
                      setModifyAvatar(!modifyAvatar);
                    }}
                    icon={"pen"}
                  />
                  {modifyAvatar ? (
                    previewAvatar ? (
                      <>
                        <img src={previewAvatar} alt="avatar" />
                        <FontAwesomeIcon
                          className="account-remove-avatar"
                          icon={"xmark"}
                          onClick={() => {
                            setAvatar(null);
                            setPreviewAvatar("");
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="account-change-avatar"
                          className="custom-file-upload"
                        >
                          + Nouvel avatar
                        </label>
                        <input
                          type="file"
                          id="account-change-avatar"
                          onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                              setAvatar(event.target.files[0]);
                              setPreviewAvatar(
                                URL.createObjectURL(event.target.files[0])
                              );
                            }
                          }}
                        />
                      </>
                    )
                  ) : (
                    data &&
                    data.account.avatar &&
                    "secure_url" in data.account.avatar &&
                    data.account.avatar.secure_url && (
                      <img src={data?.account.avatar.secure_url} alt="avatar" />
                    )
                  )}
                </div>
              </div>
              <button>Sauvegarder les modifications</button>
            </>
          )}
        </form>
      )}
    </main>
  );
};

export default Account;
