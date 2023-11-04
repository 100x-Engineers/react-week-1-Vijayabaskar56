import { useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(true);
  return (
    <>
      <AuthContext.Provider value={{ isLoggedin, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
