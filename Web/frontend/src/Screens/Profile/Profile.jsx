import React, { useContext, useEffect } from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
// import Card from "../Components/Card";
// import { getPostByUser } from "../Helpers/BlogPost";
// import { ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const Profile = () => {
  const { user } = useContext(AuthContext);
  document.title = `${user.fname} - #Youth4Digital`;

  //   const [userPosts, setUserPosts] = React.useState([]);
  //   const [fetchSuccess, setFetchSuccess] = React.useState(false);
  // const [networkError, setNetworkError] = React.useState("");
  // const [zeroPosts, setZeroPosts] = React.useState(false);

  //   useEffect(() => {
  //     getPostByUser(user.id)
  //       .then((data) => {
  //         if (data.err) {
  //           console.log(data.err);
  //         }
  //         setUserPosts(data.posts);
  //         setFetchSuccess(true);
  //       })
  //       .catch((err) => console.log(err));
  //   }, [user]);

  const ProfileContents = () => {
    console.log(user);
    return (
      <Container component="main" maxWidth="lg">
        {/* Header Section */}
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} md={12} style={{ zIndex: "1" }}>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1524169113253-c6ba17f68498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt=""
                    className="img img-fluid mt-3 rounded "
                    style={{ height: "400px", width: "100%" }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <div
                  className="jumbotron d-flex justify-content-center"
                  style={{ boxShadow: "none" }}
                >
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "50%",
                      boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.3) ",
                    }}
                  >
                    <img
                      src={`http://localhost:4000/${user.image}`}
                      alt="UserProfileImage"
                      className="img img-fluid  d-flex justify-content-center "
                      style={{
                        margin: "0 auto",
                        marginLeft: "0%",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="d-flex text-center ml-3 mt-2 h2">
                      {user.name.toUpperCase()}
                    </h1>
                    <span className="d-flex text-center ml-3 h6-responsive">
                      {user.email}
                    </span>
                    {" "}
                    <br />
                    <span className="ml-3">
                      <Link to="/settings">
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<EditIcon />}
                        >
                          Edit Profile
                        </Button>
                      </Link>
                    </span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Description Section */}
          <Grid item xs={12} sm={12} md={4}>
            <div className="card py-4 pr-2 pl-2" style={{ boxShadow: "none" }}>
              {/* <h4 className="h4">Your details :</h4> */}
              <h6>{user.description}</h6>
              <hr />
              <h6>
                {" "}
                <strong>Email :</strong>
                {user.email}
              </h6>
              <h6>
                <strong>Username :</strong>
                {user.username}
              </h6>
              <h6>
                <strong>Phone Number :</strong>
                {user.pnumber}
              </h6>
            </div>

            <br />

            <div className="card py-4 pr-2 pl-2" style={{ boxShadow: "none" }}>
              <h4 className="h4">Skills :</h4>
              <h6>{user.description}</h6>
            </div>
          </Grid>

          {/* Your Posts */}
          <Grid item xs={12} sm={12} md={8}>
            <div
              className="card pt-3 pr-4 pl-4 pb-3"
              style={{ boxShadow: "none" }}
            >
              <h1 className="d-flex justify-content-center h1-responsive">
                Your posts
              </h1>
              {/* <Grid container spacing={2}>
                {userPosts.length === 0
                  ? (
                    <div className="my-5 d-flex justify-content-center ">
                      <h4>
                        You haven't Posted anything yet.
                        <Link to="/create">
                          <Typography>Create one now!</Typography>
                        </Link>
                      </h4>
                    </div>
                  )
                  : (
                    userPosts.map((li, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                        <Card
                          title={li.title}
                          description={`${li.description.slice(0, 20)}........`}
                          id={li._id}
                          image={li.image}
                        />
                      </Grid>
                    ))
                  )}
              </Grid> */}
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  };

  return (
    <>
      {ProfileContents()}
    </>
  );
};

export default Profile;
