import "./header.scss";
import logoMarvel from "./../../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"} className="react-router-link">
        <img src={logoMarvel} alt="marvel" />
      </Link>
      <nav className="container">
        <Link to={"/characters"} className="react-router-link">
          <h2>Explorer les Personnages</h2>
        </Link>
        <Link className="react-router-link">
          <h2>Explorer les Comics</h2>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
