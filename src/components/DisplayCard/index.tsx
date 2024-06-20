import EPictureFormat from "../../enums/PictureFormat";
import createPictureUrl from "../../utils/createPictureUrl";
import "./displayCard.scss";

const DisplayCard = ({
  picture,
  extension,
  name,
  description,
}: {
  picture: string;
  extension: string;
  name: string;
  description: string;
}) => {
  const pictureUrl = createPictureUrl({
    url: picture,
    extension: extension,
    format: EPictureFormat.PortraitIncredible,
  });
  console.log(pictureUrl);

  return (
    <article className="display-card-component">
      <img src={pictureUrl} alt={name} />
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
