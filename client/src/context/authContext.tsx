import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type Token = {
  access_token: string;
  refresh_token: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  about: string;
  title: string;
  isMentor: boolean;
  country: {
    id: number;
    country: string;
  }[];
  languages: {
    id: number;
    language: string;
  }[];
  skills: {
    id: number;
    skill: string;
  }[];
  image: {
    id: number;
    fileName: string;
    fileUrl: string;
    key: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }[];
};

export interface AuthContextInterface {
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  token: {
    access_token: "",
    refresh_token: "",
  },
  setToken: (token: Token) => {},
  user: {},
  setUser: (user: User) => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultState);

type AuthProvideProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProvideProps) => {
  const [token, setToken] = useState<Token>({} as Token);
  const [user, setUser] = useState<User>({} as User);
  return <AuthContext.Provider value={{ token, setToken, user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
