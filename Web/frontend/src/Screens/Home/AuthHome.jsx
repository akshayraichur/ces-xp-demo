import React from "react";
import { AuthContext } from "../../Context/AuthContext";

export const AuthHome = () => {
  // eslint-disable-next-line
  const { user, isAuthenticated } = React.useContext(AuthContext);
  return (
    <div>
      <h1>This is auth home</h1>
    </div>
  );
};
