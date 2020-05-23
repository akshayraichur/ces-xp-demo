import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleCourse } from "../../Helpers/Courses";
import { Container, Grid, Button } from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
import { getCreatorDetails } from "../../Helpers/User";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const CoursesPost = () => {
  const { coid } = useParams();

  const [course, setCourse] = useState({});
  // eslint-disable-next-line
  const [err, setErr] = useState(null);
  const [creator, setCreator] = useState(null);

  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    getSingleCourse(coid)
      .then((data) => {
        if (data.err) {
          setErr(data.err);
          console.log(data.err);
        } else {
          setCourse(data.course);
        }
      })
      .catch((err) => err);

    //TODO: Watch out for this! Might give error
  }, [coid]);

  useEffect(() => {
    getCreatorDetails(course.creator)
      .then((data) => {
        setCreator(data.creator);
      })
      .catch((err) => console.log(err));
  }, [course]);

  return (
    <div>
      <Container component="main" maxWidth="md" className="mt-5 pt-3">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <img
              src={`http://localhost:4000/${course.image}`}
              alt="img"
              className="img img-fluid"
            />
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex justify-content-between ">
              <h2 className="h2">{course.name}</h2>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex justify-content-between">
              <div className="">
                <h5 className="h5">{`Price : ${course.price}/-`}</h5>

                <h6 className="h6">
                  {`Date of Course : ${course.dateOfCourse}`}
                </h6>
              </div>

              <Button
                className="btn btn-lg btn-success"
                disabled={isAuthenticated ? false : true}
                startIcon={<ShoppingCartIcon />}
              >
                Buy Now!
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="ml-auto d-flex">
              <h4 className="h4 d-flex justify-content-start">
                Host : <span>{` ${creator}`}</span>
              </h4>
              {user.role === 1 && user.id === course.creator
                ? (
                  <>
                    <div className="ml-auto justify-content-end">
                      <Link to={`/courses/edit/${course._id}`}>
                        <Button
                          variant="outlined"
                          className="mr-3"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="ml-3"
                        startIcon={<DeleteForeverIcon />}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )
                : null}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <h5 className="h5-responsive">{course.description}</h5>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
