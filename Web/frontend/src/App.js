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
import Profile from "./Screens/Profile/Profile.jsx";
import "./App.css";
import { WorkshopPost } from "./Screens/Workshop/WorkshopPost.jsx";
import { ConferencePost } from "./Screens/Conferences/ConferencePost.jsx";
import { CoursesPost } from "./Screens/Courses/CoursesPost.jsx";
import { Create } from "./Screens/Create.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { AddWorkshop } from "./Screens/Workshop/AddWorkshop.jsx";
import { AddConference } from "./Screens/Conferences/AddConference.jsx";
import { AddCourse } from "./Screens/Courses/AddCourse.jsx";
import { EditWorkshop } from "./Screens/Workshop/EditWorkshop.jsx";

function App() {
  const { isAuthenticated, user } = React.useContext(AuthContext);

  AOS.init();
  return (
    <>
      <NavBar />
      <Switch>
        {isAuthenticated ? (
          <Route path="/" exact component={AuthHome} />
        ) : (
          <Route path="/" exact component={UnAuthHome} />
        )}

        <Route path="/signin" exact component={Signin} />
        <Route path="/register" exact component={Register} />
        <Route path="/courses" exact component={Courses} />
        <Route path="/workshops" exact component={Workshop} />
        <Route path="/conferences" exact component={Conferences} />
        <Route path="/workshops/:wid" exact component={WorkshopPost} />
        <Route path="/conferences/:cid" exact component={ConferencePost} />
        <Route path="/courses/:coid" exact component={CoursesPost} />

        {/* Authenticated Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/profile" exact component={Profile} />
            {user.role === 1 ? (
              <>
                <Route path="/create" exact component={Create} />
                <Route
                  path="/create/add-workshop"
                  exact
                  component={AddWorkshop}
                />
                <Route
                  path="/create/add-conference"
                  exact
                  component={AddConference}
                />
                <Route path="/create/add-course" exact component={AddCourse} />
                <Route path="/workshops/edit/:wid" component={EditWorkshop} />
              </>
            ) : (
              <Route component={ErrorPage} />
            )}
          </>
        ) : (
          <Route component={ErrorPage} />
        )}

        {/* Page Not Found Route */}
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
