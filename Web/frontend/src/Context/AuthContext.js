import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Authenticate } from "../Helpers/Auth";

export const AuthContext = React.createContext();

export default ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("access_token") && localStorage.getItem("user")) {
      // eslint-disable-next-line
      const access_token = localStorage.getItem("access_token");
      const userStorage = localStorage.getItem("user");
      setIsAuthenticated(true);
      setUser(userStorage);
    } else {
      setIsAuthenticated(false);
      setUser({});
    }
  }, []);

  return (
    //   or can also be used simply with <></Redirect>
    <React.Fragment>
      {isLoaded
        ? (
          <AuthContext.Provider
            value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
          >
            {children}
          </AuthContext.Provider>
        )
        : (
          <h1>Loading.....</h1>
        )}
    </React.Fragment>
  );
};
