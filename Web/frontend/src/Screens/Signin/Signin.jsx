import React from "react";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = (props) => {
  return <Snackbar open={true} autoHideDuration={6000}>
    <Alert severity={props.severity}>
      {props.message}
    </Alert>
  </Snackbar>;
};

const validationSchema = () => {
  return Yup.object({
    email: Yup.string().required("Email is required").email(
      "Please enter your email correctly",
    ),
    password: Yup.string().min(3, "Minimum of 3 Characters is required")
      .required("Dont skip your password"),
  });
};

export const Signin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const FormContents = () => {
    return (<div>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12} className="d-flex justify-content-center my-5">
            <Typography variant="h4" component="h4" className="pl-2">
              Signin
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {formik.errors.email && formik.touched.email
              ? <Message message={formik.errors.email} severity="error" />
              : null}

            {formik.errors.password && formik.touched.password
              ? <Message message={formik.errors.password} severity="error" />
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
    </div>);
  };

  return <>{FormContents()}</>;
};
