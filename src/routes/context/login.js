import { useContext, createContext } from "react";

export const LoginContext = createContext({
  profile: [
    {
      name: "",
      email: "",
      dateOfBirth: "",
    },
  ],
  getProfileDetais: (profile) => {},
});

export const LoginProvider = LoginContext.Provider;

export function useProfile() {
  return useContext(LoginContext);
}
