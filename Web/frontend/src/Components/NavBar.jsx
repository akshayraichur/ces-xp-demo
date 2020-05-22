import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav
        className="mb-1 navbar navbar-expand-lg navbar-dark indigo lighten-1"
      >
        <Link className="navbar-brand" to=".">Experimental Learning</Link>
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
            <div className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item avatar ">
                <Link className="nav-link p-0" to=".">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                    className="rounded-circle z-depth-0"
                    alt="avatarimage"
                    height="35"
                  />
                </Link>
              </li>
            </div>
          </ul>
          {/* <ul class="navbar-nav ml-auto nav-flex-icons">
          </ul> */}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
