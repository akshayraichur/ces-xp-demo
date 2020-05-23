import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourse } from "../../Helpers/Courses";
import { Container, Grid, Button } from "@material-ui/core";

export const WorkshopPost = () => {
  const { wid } = useParams();
  const [workshop, setworkshop] = useState({});
  const [err, setErr] = useState(null);

  useEffect(() => {
    getSingleCourse(wid).then((data) => {
      if (data.err) {
        setErr(data.err);
        console.log(data.err);
      } else {
        setworkshop(data.workshop);
      }
    }).catch((err) => err);
  }, []);

  return (
    <div>
      <h1>Hi Workshop Post {wid}</h1>
    </div>
  );
};
