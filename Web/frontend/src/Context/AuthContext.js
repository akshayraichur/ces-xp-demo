import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("access_token") && localStorage.getItem("user")) {
      // eslint-disable-next-line
      const userStorage = JSON.parse(localStorage.getItem("user"));
      setIsAuthenticated(true);
      setUser(userStorage);
      setIsLoaded(true);
    } else {
      setIsAuthenticated(false);
      setUser({});
      setIsLoaded(true);
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
