import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@material-ui/core";

const NavBar = () => {
  const { isAuthenticated, user, setUser, setIsAuthenticated } = React
    .useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser({});
    setIsAuthenticated(false);
  };
  return (
    <div>
      <nav
        className="mb-1 navbar navbar-expand-lg navbar-dark indigo "
      >
        <div className="container">
          <Link className="navbar-brand" to="/">Learning Made Easy</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-555"
            aria-controls="navbarSupportedContent-555"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-555"
          >
            {isAuthenticated
              ? (
                <>
                  <ul className="navbar-nav ml-auto ">
                    {user.role === 1
                      ? (
                        <>
                          <li className="nav-item">
                            <Link className="nav-link" to="/create">
                              Create
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/my-courses">
                              My Courses
                            </Link>
                          </li>
                        </>
                      )
                      : null}
                    <li className="nav-item mr-3 ml-3">
                      <Button
                        className="nav-link"
                        color="primary"
                        style={{ textDecoration: "none" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </li>

                    <div
                      className="navbar-nav ml-auto nav-flex-icons mr-3 ml-3"
                    >
                      <li className="nav-item avatar ">
                        <Link className="nav-link p-0" to="/profile">
                          <img
                            src={`http://localhost:4000/${user.photo}`}
                            className="rounded-circle z-depth-0"
                            alt="avatarimage"
                            height="35"
                          />
                        </Link>
                      </li>
                    </div>
                  </ul>
                </>
              )
              : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to=".">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Signin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </ul>
              )}

            {/* <ul class="navbar-nav ml-auto nav-flex-icons">
          </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
