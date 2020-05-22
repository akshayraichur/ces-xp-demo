import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div>
      <div className="card">
        <div className="view overlay">
          <img
            className="card-img-top"
            src={`http://localhost:4000/${props.image}`}
            alt="Cardimagecap"
            style={{ height: "250px" }}
          />
          <Link to="/">
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>

        <div className="card-body">
          <Link className="activator waves-effect waves-light mr-4" to="/">
            <i className="fas fa-share-alt">
            </i>
          </Link>

          <h4 className="card-title">{props.name}</h4>
          <hr />

          <p className="card-text">
            {props.description}
          </p>

          <a href="#!" className="black-text d-flex justify-content-end">
            <h5>Read more <i className="fas fa-angle-double-right"></i></h5>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
