import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  setToken: () => {},
  setUser: () => {},
});

export const AuthProvider = AuthContext.Provider;

export function useAuth() {
  return useContext(AuthContext);
}
