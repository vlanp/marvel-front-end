import EPictureFormat from "../enums/PictureFormat";

const createPictureUrl = ({
  url,
  extension,
  format,
}: {
  url: string;
  extension: string;
  format: EPictureFormat;
}) => {
  return url + "/" + format + "." + extension;
};

export default createPictureUrl;
