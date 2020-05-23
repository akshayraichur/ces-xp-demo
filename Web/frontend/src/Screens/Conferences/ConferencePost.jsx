import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";

import { AuthContext } from "../../Context/AuthContext";
import { getAConf } from "../../Helpers/Conf";

export const ConferencePost = () => {
  const { cid } = useParams();
  const [conferences, setConferences] = useState({});
  const [err, setErr] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getAConf(cid).then((data) => {
      if (data.err) {
        setErr(data.err);
        console.log(data.err);
      } else {
        setConferences(data.conference);
      }
    }).catch((err) => err);
  }, []);

  return (
    <div>
      <Container component="main" maxWidth="md" className="mt-5 pt-3">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <img
              src={`http://localhost:4000/${conferences.image}`}
              alt="img"
              className="img img-fluid"
            />
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex justify-content-between">
              <h2 className="h2">{conferences.name}</h2>
              <Button
                className="btn btn-success"
                disabled={isAuthenticated ? false : true}
              >
                Buy Now!
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <h5 className="h5-responsive">{conferences.description}</h5>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
