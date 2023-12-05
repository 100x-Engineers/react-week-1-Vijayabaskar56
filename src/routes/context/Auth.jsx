// import { createContext, useContext } from "react";

// export const AuthContext = createContext({
//   user: null,
//   token: null,
//   setToken: () => {},
//   setUser: () => {},
// });

// export const AuthProvider = AuthContext.Provider;

// export function useAuth() {
//   return useContext(AuthContext);
// }

import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setingToken] = useState(localStorage.getItem("Token"));
  // Function to set the authentication token
  const setToken = (newToken) => {
    setingToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("Token", token);
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
