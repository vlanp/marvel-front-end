import "./App.scss";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import ComicsWithCharacter from "./pages/ComicsWithCharacter";
import Comics from "./pages/Comics";
import CharactersWithinComic from "./pages/CharactersWithinComic";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ValidAddressEmail from "./pages/ValidEmailAddress";
import Account from "./pages/Account";

// Components
import Header from "./components/Header";

// Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faMagnifyingGlass,
  faXmark,
  faHeart,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faSpinner, faMagnifyingGlass, faXmark, faHeart, farHeart, faPen);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken"));

  return (
    <Router>
      <Header userToken={userToken || ""} setUserToken={setUserToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterid" element={<ComicsWithCharacter />} />
        <Route
          path="/user/signup"
          element={<SignUp userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route
          path="/user/signin"
          element={<SignIn userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route
          path="/user/account-validation"
          element={<ValidAddressEmail />}
        />
        <Route
          path="/characters/:comicid"
          element={<CharactersWithinComic />}
        />
        <Route
          path="/user/account"
          element={<Account userToken={userToken || ""} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
