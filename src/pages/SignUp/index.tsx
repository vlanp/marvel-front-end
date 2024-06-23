import { Dispatch, SetStateAction } from "react";
import "./signUp.scss";
import Sign from "../../components/Sign";
import ESign from "../../enums/Sign";

const SignUp = ({
  userToken,
  setUserToken,
}: {
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <main className="sign-up-page">
      <Sign
        userToken={userToken}
        setUserToken={setUserToken}
        sign={ESign.SignUp}
      />
    </main>
  );
};

export default SignUp;
