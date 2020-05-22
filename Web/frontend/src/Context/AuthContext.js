import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (!storage) {
      // Authenticate api call & set localstorage
    }
  }, []);

  return (
    //   or can also be used simply with <></>
    <React.Fragment>
      {isLoaded
        ? (<AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>)
        : (<h1>Loading.....</h1>)}
    </React.Fragment>
  );
};
