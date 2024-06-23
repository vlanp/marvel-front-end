interface ISign {
  _id: string;
  token: string;
  account: {
    email: string;
    username: string;
    avatar?: {
      secure_url: string;
      public_id: string;
    };
  };
}

export default ISign;
