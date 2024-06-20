import "./header.scss";
import logoMarvel from "./../../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
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
      </nav>
      <div></div>
    </header>
  );
};

export default Header;
