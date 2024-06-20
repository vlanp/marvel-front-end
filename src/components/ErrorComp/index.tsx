import "./errorComp.scss";
import deadpoolThinking from "./../../assets/img/deadpool-thinking.png";
import speechBubble from "./../../assets/img/speech-bubble.png";
import SpeakingCharacter from "../SpeakingCharacter";

const ErrorComp = ({ error }: { error: string }) => {
  return (
    <section className="errorcomp-component">
      <SpeakingCharacter
        text={error}
        speechBubble={speechBubble}
        characterImg={deadpoolThinking}
      />
    </section>
  );
};

export default ErrorComp;
