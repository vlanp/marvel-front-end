import "./loading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <section className="loading-component">
      <p>Chargement de la page en cours</p>
      <div>
        <FontAwesomeIcon className="loading-component-icon" icon={"spinner"} />
      </div>
    </section>
  );
};

export default Loading;
