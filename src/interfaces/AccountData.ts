interface AccountData {
  account: {
    username: string;
    avatar?: {
      secure_url: string;
      public_id: string;
    };
    email: string;
  };
  active: boolean;
}

export default AccountData;
