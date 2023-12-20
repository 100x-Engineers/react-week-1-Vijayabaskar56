import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export const AuthProvider = AuthContext.Provider;

export function useAuth() {
  return useContext(AuthContext);
}
