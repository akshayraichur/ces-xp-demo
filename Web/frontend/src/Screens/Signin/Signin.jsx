import React, { useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { signin } from "../../Helpers/Auth";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = (props) => {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

const validationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter your email correctly"),
    password: Yup.string()
      .min(3, "Minimum of 3 Characters is required")
      .required("Dont skip your password"),
  });
};

export const Signin = () => {
  const history = useHistory();
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(
    AuthContext,
  );

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    signin(formData)
      .then((data) => {
        if (data.err) {
          setErr(data.err);
        } else {
          setIsAuthenticated(data.data.isAuthenticated);
          setUser(data.data.user);
          console.log(data.data.user);
          // Also set the localstorage with access_token
          localStorage.setItem("access_token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          setSuccess(true);
          history.push("/");
        }
      })
      .catch();
  };

  const formik = useFormik({
    initialValues: {
      email: "aa@g.com",
      password: "1234567890",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const FormContents = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <Grid container spacing={2}>
            <Grid item xs={12} className="d-flex justify-content-center my-5">
              <Typography variant="h4" component="h4" className="pl-2">
                Signin
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {formik.errors.email && formik.touched.email
                ? (
                  <Message message={formik.errors.email} severity="error" />
                )
                : null}

              {formik.errors.password && formik.touched.password
                ? (
                  <Message message={formik.errors.password} severity="error" />
                )
                : null}
            </Grid>

            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="email"
                    required
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="password"
                    required
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </Grid>

                <Grid item xs={12} className="d-flex justify-content-center">
                  <Button variant="contained" color="secondary" type="submit">
                    Take me in!
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </div>
    );
  };

  return <>{FormContents()}{isAuthenticated ? history.push("/") : null}</>;
};
