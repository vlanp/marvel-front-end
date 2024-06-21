import "./App.scss";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import ComicsWithCharacter from "./pages/ComicsWithCharacter";
import Comics from "./pages/Comics";
import CharactersWithinComic from "./pages/CharactersWithinComic";

// Components
import Header from "./components/Header";

// Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faMagnifyingGlass,
  faXmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faSpinner, faMagnifyingGlass, faXmark, faHeart, farHeart);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterid" element={<ComicsWithCharacter />} />
        <Route
          path="/characters/:comicid"
          element={<CharactersWithinComic />}
        />
      </Routes>
    </Router>
  );
}

export default App;
