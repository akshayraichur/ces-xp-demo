import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourse } from "../../Helpers/Courses";
import { Container, Grid, Button } from "@material-ui/core";

export const CoursesPost = () => {
  const { coid } = useParams();

  const [course, setCourse] = useState({});
  const [err, setErr] = useState(null);

  useEffect(() => {
    getSingleCourse(coid).then((data) => {
      if (data.err) {
        setErr(data.err);
        console.log(data.err);
      } else {
        setCourse(data.course);
      }
    }).catch((err) => err);
  }, []);

  console.log(course);
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
              <h2 className="h2">{course.name}</h2>
              <Button className="btn btn-success">Buy Now!</Button>
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
