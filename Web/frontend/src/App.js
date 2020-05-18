import React from "react";
import NavBar from "./Components/NavBar";
import { Register } from "./Screens/Register/Register";
import { Signin } from "./Screens/Signin/Signin";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/signin" exact>
          <Signin />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>
      </Switch>
    </>
  );
}

export default App;
