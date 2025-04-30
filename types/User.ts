export type RegisterData = {
  displayName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export interface User {
  uid: string | null;
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  authorized: boolean;
  error: string | null;
}
