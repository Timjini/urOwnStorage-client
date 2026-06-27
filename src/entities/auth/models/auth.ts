export interface IAuth {
  user: {
    email: string;
    password: string;
  };
}

export interface AuthAttributes {
  email: string;
  authToken: string;
}
