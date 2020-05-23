import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { getSingleWorkshop } from "../../Helpers/Workshop";
import { AuthContext } from "../../Context/AuthContext";
import { getCreatorDetails } from "../../Helpers/User";

export const WorkshopPost = () => {
  const { wid } = useParams();
  const [workshop, setWorkshop] = useState({});
  const [creator, setCreator] = useState(null);
  // eslint-disable-next-line
  const [err, setErr] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getSingleWorkshop(wid)
      .then((data) => {
        if (data.err) {
          setErr(data.err);
          console.log(data.err);
        } else {
          setWorkshop(data.workshop);
        }
      })
      .catch((err) => console.log(err));

    //TODO: Watch out for this! Might give error
  }, [wid]);

  useEffect(() => {
    getCreatorDetails(workshop.creator)
      .then((data) => {
        setCreator(data.creator);
      })
      .catch((err) => console.log(err));
  }, [workshop]);

  return (
    <div>
      <Container component="main" maxWidth="md" className="mt-5 pt-3">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <img
              src={`http://localhost:4000/${workshop.image}`}
              alt="img"
              className="img img-fluid"
            />
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex justify-content-between">
              <h2 className="h2">{workshop.name}</h2>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex justify-content-between">
              <div className="">
                <h5 className="h5">{`Price : ${workshop.price}/-`}</h5>

                <h6 className="h6">
                  {`Date of Workshop : ${workshop.dateOfWorkshop}`}
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
            <h4 className="h4">Edit Button</h4>
          </Grid>

          <Grid item xs={12}>
            <h4 className="h4">
              Host : <span>{creator}</span>
            </h4>
          </Grid>

          <Grid item xs={12}>
            <div>
              <h5 className="h5-responsive">{workshop.description}</h5>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
