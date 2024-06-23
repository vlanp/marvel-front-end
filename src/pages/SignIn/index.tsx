import { Dispatch, SetStateAction } from "react";
import "./signIn.scss";
import Sign from "../../components/Sign";
import ESign from "../../enums/Sign";

const SignIn = ({
  userToken,
  setUserToken,
}: {
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <main className="sign-in-page">
      <Sign
        userToken={userToken}
        setUserToken={setUserToken}
        sign={ESign.SignIn}
      />
    </main>
  );
};

export default SignIn;
