import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
import { getAConf, deleteConference } from "../../Helpers/Conf";
import { getCreatorDetails } from "../../Helpers/User";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const ConferencePost = () => {
  const { cid } = useParams();
  const [conferences, setConferences] = useState({});
  const [creator, setCreator] = useState(null);
  // eslint-disable-next-line
  const [err, setErr] = useState(null);

  const history = useHistory();

  const { isAuthenticated, user, access_token } = useContext(AuthContext);

  const handleClick = () => {
    deleteConference(cid, access_token).then((data) => {
      if (data.err) {
        setErr(data.err);
      } else {
        history.push("/conferences");
      }
    });
  };

  useEffect(() => {
    getAConf(cid)
      .then((data) => {
        if (data.err) {
          setErr(data.err);
          console.log(data.err);
        } else {
          setConferences(data.conference);
        }
      })
      .catch((err) => err);

    //TODO: Watch out for this! Might give error
  }, [cid]);

  useEffect(() => {
    getCreatorDetails(conferences.creator)
      .then((data) => {
        setCreator(data.creator);
      })
      .catch((err) => console.log(err));
  }, [conferences]);

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
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex justify-content-between">
              <div className="">
                <h5 className="h5">{`Price : ${conferences.price}/-`}</h5>

                <h6 className="h6">
                  {`Date of Conference : ${conferences.dateOfConference}`}
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
              {user.role === 1 && user.id === conferences.creator
                ? (
                  <>
                    <div className="ml-auto justify-content-end">
                      <Link to={`/conferences/edit/${conferences._id}`}>
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
                        onClick={handleClick}
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
              <h5 className="h5-responsive">{conferences.description}</h5>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
