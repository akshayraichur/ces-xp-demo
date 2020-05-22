import React from "react";
import NavBar from "./Components/NavBar.jsx";
import { Register } from "./Screens/Register/Register";
import { Signin } from "./Screens/Signin/Signin";
import { Switch, Route } from "react-router-dom";
import { UnAuthHome } from "./Screens/Home/UnAuthHome.jsx";
import { AuthContext } from "./Context/AuthContext";
import { AuthHome } from "./Screens/Home/AuthHome.jsx";
import { Courses } from "./Screens/Courses/Courses.jsx";
import { ErrorPage } from "./Screens/ErrorPage";
import { Workshop } from "./Screens/Workshop/Workshop.jsx";
import { Conferences } from "./Screens/Conferences/Conferences.jsx";

function App() {
  const { isAuthenticated } = React.useContext(AuthContext);
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/signin" exact>
          <Signin />
        </Route>

        {isAuthenticated
          ? (<Route path="/" exact>
            <AuthHome />
          </Route>)
          : (<Route path="/" exact>
            <UnAuthHome />
          </Route>)}

        <Route path="/register" exact>
          <Register />
        </Route>

        <Route path="/courses" exact>
          <Courses />
        </Route>
        <Route path="/workshops">
          <Workshop />
        </Route>
        <Route path="/conferences">
          <Conferences />
        </Route>
      </Switch>
    </>
  );
}

export default App;
