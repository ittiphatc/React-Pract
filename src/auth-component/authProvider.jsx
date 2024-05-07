import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import proptype from 'prop-types';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
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

export const getUserID = () => {  
  return (jwtDecode(localStorage.getItem("token"), "food_secret")).ID;
}

export const getRole = () => {  
  return (jwtDecode(localStorage.getItem("token"), "food_secret")).Roles;
}

export const getUsername = () => {  
  return (jwtDecode(localStorage.getItem("token"), "food_secret")).username;
}

AuthProvider.propTypes = {
  children: proptype.node.isRequired,
};

export default AuthProvider;