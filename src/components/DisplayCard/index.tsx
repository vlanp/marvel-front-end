import EPictureFormat from "../../enums/PictureFormat";
import createPictureUrl from "../../utils/createPictureUrl";
import "./displayCard.scss";

const DisplayCard = ({
  picture,
  extension,
  name,
  description,
  handleClick,
  format,
}: {
  picture: string;
  extension: string;
  name: string;
  description: string;
  handleClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  format: EPictureFormat.PortraitIncredible | EPictureFormat.PortraitUncanny;
}) => {
  const pictureUrl = createPictureUrl({
    url: picture,
    extension: extension,
    format: format,
  });

  return (
    <article
      className={
        format === EPictureFormat.PortraitIncredible
          ? "display-card-component-incredible"
          : "display-card-component-uncanny"
      }
    >
      <img src={pictureUrl} alt={name} onClick={handleClick} />
      <div className="display-card-component-information">
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
      </div>
    </article>
  );
};

export default DisplayCard;
