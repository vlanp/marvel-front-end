import { useState } from "react";
import EPictureFormat from "../../enums/PictureFormat";
import createPictureUrl from "../../utils/createPictureUrl";
import "./displayCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EEndpointName } from "../../enums/Endpoints";
import Cookies from "js-cookie";

const DisplayCard = ({
  picture,
  extension,
  name,
  description,
  handleClick,
  format,
  type,
  id,
}: {
  picture: string;
  extension: string;
  name: string;
  description: string;
  handleClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  format: EPictureFormat.PortraitIncredible | EPictureFormat.PortraitUncanny;
  type: EEndpointName.CHARACTERS | EEndpointName.COMICS;
  id: string;
}) => {
  const pictureUrl = createPictureUrl({
    url: picture,
    extension: extension,
    format: format,
  });

  const favoriteInCookies = Cookies.get("favorite" + type);
  const parsedFavoriteInCookies =
    favoriteInCookies && JSON.parse(favoriteInCookies);
  const cookiesIsArray = Array.isArray(parsedFavoriteInCookies);

  const isFavorite = () => {
    if (!cookiesIsArray) {
      return false;
    }
    const filtered = (parsedFavoriteInCookies as Array<string>).filter(
      (_id) => {
        return _id === id;
      }
    );
    return filtered.length === 1;
  };

  const [favoriteState, setFavoriteState] = useState<boolean>(isFavorite());

  const handleCookies = () => {
    const favoriteInCookies = Cookies.get("favorite" + type);
    let parsedFavoriteInCookies =
      favoriteInCookies && JSON.parse(favoriteInCookies);
    const cookiesIsArray = Array.isArray(parsedFavoriteInCookies);
    setFavoriteState(!favoriteState);
    if (favoriteState) {
      if (cookiesIsArray) {
        const index = parsedFavoriteInCookies.indexOf(id);
        index >= 0 && parsedFavoriteInCookies.splice(index, 1);
      }
    } else {
      if (cookiesIsArray) {
        parsedFavoriteInCookies.push(id);
      } else {
        parsedFavoriteInCookies = [id];
      }
    }
    const stringifiedFavoriteInCookies = JSON.stringify(
      parsedFavoriteInCookies
    );
    Cookies.set("favorite" + type, stringifiedFavoriteInCookies);
  };

  return (
    <article
      className={
        format === EPictureFormat.PortraitIncredible
          ? "display-card-component-incredible"
          : "display-card-component-uncanny"
      }
    >
      <FontAwesomeIcon
        className="display-card-component-heart"
        // @ts-expect-error - From font awesome doc : Currently there are some issues using custom icons with Typescript. We’ll be working to address these in future versions of Font Awesome but for now, we have a few workarounds.
        icon={favoriteState ? "heart" : "fa-regular fa-heart"}
        onClick={handleCookies}
      />
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
