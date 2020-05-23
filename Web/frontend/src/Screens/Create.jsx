import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Create = () => {
  return (
    <div>
      <div className="my-5 pt-5">
        <Container component="main" maxWidth="sm">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h2
                className="h2 text-center d-flex justify-content-center"
                data-aos="zoom-in-up"
              >
                What do you want to create today?
              </h2>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="my-5">
        <Container component="main" maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Link to="/create/add-workshop">
                {/* 1st card items with aos */}
                <div
                  className="card bg-primary my-5 py-5"
                  data-aos="zoom-in-up"
                >
                  <div className="card-body">
                    <h4 className="card-title text-center text-white">
                      Workshop
                    </h4>
                  </div>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link to="/create/add-conference">
                {/* 1st card items with aos */}
                <div className="card indigo my-5 py-5" data-aos="zoom-in-up">
                  <div className="card-body">
                    <h4 className="card-title text-center text-white">
                      Conference
                    </h4>
                  </div>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link to="/create/add-course">
                {/* 1st card items with aos */}
                <div className="card  my-5 py-5 teal" data-aos="zoom-in-up">
                  <div className="card-body">
                    <h4 className="card-title text-center text-white">
                      Course
                    </h4>
                  </div>
                </div>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
