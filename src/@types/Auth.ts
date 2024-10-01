export type ApiAuthLogin = {
  accessToken: string;
  refreshToken: string;
};

export type JwtToken = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  tenant: string;
  isSuper: boolean;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
};

export type UserApplication = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  tenant: string;
  isSuper: boolean;
};
