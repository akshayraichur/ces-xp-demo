import React from "react";
import { Link } from "react-router-dom";
// import { Modal } from "./Modal";
import { Button } from "@material-ui/core";

const Card = (props) => {
  const splitDescription = props.description.split(" ");

  const smallDescription = splitDescription.map((s, index) => {
    if (index < 5) {
      // console.log("S", s);
      return s;
    } else {
      return null;
    }
  });

  const des = smallDescription.join(" ");

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
          <Link to={props.link}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>

        <div className="card-body">
          <h4 className="card-title">{props.name}</h4>

          <h6 className="text-strong">{`Price : ${props.price}/-`}</h6>
          <hr />

          <p className="card-text">
            {`${des}..........`}
          </p>

          <div className="d-flex justify-content-between">
            <Link to={props.link}>
              <Button
                type="button"
                data-toggle="modal"
                data-target={`#${props.id}`}
                color="secondary"
                variant="outlined"
                className="d-flex justify-content-between"
              >
                Read more &nbsp; <i className="fas fa-angle-double-right"></i>
              </Button>
            </Link>
            <Button
              data-toggle="modal"
              data-target="#exampleModalCenter"
              color="primary"
              variant="contained"
            >
              Buy Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
