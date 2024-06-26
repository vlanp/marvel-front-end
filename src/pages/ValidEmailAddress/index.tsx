import { useLocation } from "react-router-dom";
import "./validAddressEmail.scss";

const ValidAddressEmail = () => {
  const { email } = useLocation().state;
  return (
    <main className="valid-address-email">
      <div>
        <p>
          Merci de cliquer sur le lien que vous avez reçu sur la boite mail{" "}
          <span>{email}</span> afin d'activer votre compte.
        </p>
      </div>
    </main>
  );
};

export default ValidAddressEmail;
