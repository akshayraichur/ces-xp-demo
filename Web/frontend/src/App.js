import React from "react";
import NavBar from "./Components/NavBar.jsx";
import { Register } from "./Screens/Register/Register";
import { Signin } from "./Screens/Signin/Signin";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Screens/Home/Home.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/signin" exact>
          <Signin />
        </Route>

        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>
      </Switch>
    </>
  );
}

export default App;
