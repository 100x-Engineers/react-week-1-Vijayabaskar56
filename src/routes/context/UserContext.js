import { createContext, useContext } from "react";

export const UserContext = createContext({
  users: null,
  isLoadingUser: true,
  isErrorUser: "",
  setUser: () => {},
  setIsLoadingUser: () => {},
  setIsErrorUser: () => {},
});

export const UserProvider = UserContext.Provider;

export function useUser() {
  return useContext(UserContext);
}
