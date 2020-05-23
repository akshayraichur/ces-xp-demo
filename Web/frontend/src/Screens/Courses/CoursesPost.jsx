import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourse } from "../../Helpers/Courses";
import { Container, Grid, Button } from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
import { getCreatorDetails } from "../../Helpers/User";

export const CoursesPost = () => {
  const { coid } = useParams();

  const [course, setCourse] = useState({});
  // eslint-disable-next-line
  const [err, setErr] = useState(null);
  const [creator, setCreator] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getSingleCourse(coid).then((data) => {
      if (data.err) {
        setErr(data.err);
        console.log(data.err);
      } else {
        setCourse(data.course);
      }
    }).catch((err) => err);

    //TODO: Watch out for this! Might give error
  }, [coid]);

  useEffect(() => {
    getCreatorDetails(course.creator).then((data) => {
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
            <div className="d-flex justify-content-between">
              <div className="">
                <h5 className="h5">
                  {`Price : ${course.price}/-`}
                </h5>

                <h6 className="h6">
                  {`Date of Course : ${course.dateOfCourse}`}
                </h6>
              </div>

              <Button
                className="btn btn-lg btn-success"
                disabled={isAuthenticated ? false : true}
              >
                Buy Now!
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <h4 className="h4">Host : <span>{creator}</span></h4>
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