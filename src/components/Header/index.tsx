import "./header.scss";
import logoMarvel from "./../../assets/img/logo-marvel.png";
import { Link, useNavigate } from "react-router-dom";
import captainAmericaShield from "./../../assets/img/captain-america-shield.png";
import Menu, { MenuItem } from "rc-menu";
import { Dispatch, SetStateAction, useState } from "react";
import Cookies from "js-cookie";

const Header = ({
  userToken,
  setUserToken,
}: {
  userToken: string;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [accountMenu, setAccountMenu] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <header>
      <div>
        <Link to={"/"} className="react-router-link">
          <img src={logoMarvel} alt="marvel" />
        </Link>
      </div>
      <nav>
        <Link to={"/characters"} className="react-router-link">
          <h2>Explorer les Personnages</h2>
        </Link>
        <Link to={"/comics"} className="react-router-link">
          <h2>Explorer les Comics</h2>
        </Link>
        <Link to={"/favorites"} className="react-router-link">
          <h2>Voir mes favoris</h2>
        </Link>
      </nav>
      <div className="header-component-account">
        <img
          src={captainAmericaShield}
          alt="captain america's shield"
          onClick={() => setAccountMenu(!accountMenu)}
        />
        {accountMenu && (
          <Menu className="header-component-account-menu">
            <MenuItem
              className="header-component-account-menu-item"
              onClick={() => {
                setAccountMenu(false);
                if (userToken) {
                  navigate("/user/account");
                } else {
                  navigate("/user/signup");
                }
              }}
            >
              {userToken ? "Mon compte" : "M'inscrire"}
            </MenuItem>
            <MenuItem
              className="header-component-account-menu-item"
              onClick={() => {
                setAccountMenu(false);
                if (userToken) {
                  Cookies.remove("userToken");
                  setUserToken("");
                } else {
                  navigate("/user/signin");
                }
              }}
            >
              {userToken ? "Me déconnecter" : "Me connecter"}
            </MenuItem>
          </Menu>
        )}
      </div>
    </header>
  );
};

export default Header;
