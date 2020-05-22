import React from "react";
import { AuthContext } from "../../Context/AuthContext";

export const Home = () => {
  const { user, isAuthenticated } = React.useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return <div></div>;
};
