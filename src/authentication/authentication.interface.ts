export interface JWTValidatePayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface User {
  id: number;
  email: string;
}