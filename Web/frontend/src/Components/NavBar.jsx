import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, user } = React.useContext(AuthContext);
  return (
    <div>
      <nav
        className="mb-1 navbar navbar-expand-lg navbar-dark indigo lighten-1"
      >
        <div className="container">
          <Link className="navbar-brand" to=".">Learning Made Easy</Link>
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
                <ul className="navbar-nav ml-auto ">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Courses</Link>
                  </li>
                  <li className="nav-item mr-3">
                    <Link className="nav-link" to="/logout">Logout</Link>
                  </li>
                  <div className="navbar-nav ml-auto nav-flex-icons">
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
              )
              : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
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
