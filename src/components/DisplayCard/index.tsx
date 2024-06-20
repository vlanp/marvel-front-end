import EPictureFormat from "../../enums/PictureFormat";
import createPictureUrl from "../../utils/createPictureUrl";
import "./displayCard.scss";

const DisplayCard = ({
  picture,
  extension,
  name,
  description,
  handleClick,
}: {
  picture: string;
  extension: string;
  name: string;
  description: string;
  handleClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}) => {
  const pictureUrl = createPictureUrl({
    url: picture,
    extension: extension,
    format: EPictureFormat.PortraitIncredible,
  });

  return (
    <article className="display-card-component">
      <img src={pictureUrl} alt={name} onClick={handleClick} />
      <div className="display-card-component-name">
        <p>Name:</p>
        <p>{name}</p>
      </div>
      {description && (
        <div className="display-card-component-description">
          <p>Description:</p>
          <p>{description}</p>
        </div>
      )}
    </article>
  );
};

export default DisplayCard;
