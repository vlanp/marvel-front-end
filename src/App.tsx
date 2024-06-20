import "./App.scss";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";

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
} from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner, faMagnifyingGlass, faXmark);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </Router>
  );
}

export default App;
