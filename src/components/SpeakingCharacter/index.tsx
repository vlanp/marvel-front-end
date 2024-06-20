import "./speakingCharacter.scss";

const SpeakingCharacter = ({
  text,
  speechBubble,
  characterImg,
}: {
  text: string;
  speechBubble: string;
  characterImg: string;
}) => {
  return (
    <div className="speaking-character-component">
      <img
        className="speaking-character-component-character"
        src={characterImg}
        alt="deadpool thinking"
      />
      <img
        className="speaking-character-component-bubble"
        src={speechBubble}
        alt="speech bubble"
      />
      <p>{text}</p>
    </div>
  );
};

export default SpeakingCharacter;
