import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { register } from "../../Helpers/Auth";
import { useHistory } from "react-router-dom";

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
    name: Yup.string()
      .min(3, "You cant have a name with only 2 chars")
      .trim()
      .required("Name Field is required!"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter your email correctly"),
    password: Yup.string()
      .min(3, "Minimum of 3 Characters is required")
      .required("Dont skip your password"),
    phoneNumber: Yup.number().min(9, "Please enter a valid number"),
    address: Yup.string().required("You dont have an address?"),
  });
};

export const Register = () => {
  const [img, setImg] = React.useState(null);
  // eslint-disable-next-line
  const [success, setSuccess] = React.useState(false);
  // eslint-disable-next-line
  const [error, setError] = React.useState(false);
  const history = useHistory();

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const onSubmit = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("password", values.password);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("profilePic", img);

    register(formData)
      .then((data) => {
        if (data.err) {
          setError(data.err);
        }
        setSuccess(true);
        history.push("/signin");
      })
      .catch((err) => console.log(err)); //catch should be handled propely not this way!
  };

  const formik = useFormik({
    initialValues: {
      name: "akshay raichur",
      email: "aa@g.com",
      address: "belgaum",
      password: "1234567890",
      phoneNumber: "1234567890",
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
              <div style={{ alignItems: "center", display: "flex" }}>
                <AddCircleIcon />
              </div>
              {" "}
              <Typography variant="h4" component="h4" className="pl-2">
                Register!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {formik.errors.name && formik.touched.name
                ? (
                  <Message message={formik.errors.name} severity="error" />
                )
                : null}

              {formik.errors.email && formik.touched.email
                ? (
                  <Message message={formik.errors.email} severity="error" />
                )
                : null}

              {formik.errors.address && formik.touched.address
                ? (
                  <Message message={formik.errors.address} severity="error" />
                )
                : null}

              {formik.errors.password && formik.touched.password
                ? (
                  <Message message={formik.errors.password} severity="error" />
                )
                : null}

              {formik.errors.phoneNumber && formik.touched.phoneNumber
                ? (
                  <Message
                    message={formik.errors.phoneNumber}
                    severity="error"
                  />
                )
                : null}
            </Grid>

            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    required
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </Grid>
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
                    label="Address"
                    required
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    required
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Choose the best photo you have :</Typography>
                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    label="profilePic"
                    onChange={(e) => handleImageChange(e)}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </Grid>
                <Grid item xs={12} className="d-flex justify-content-center">
                  <Button variant="contained" color="secondary" type="submit">
                    Register!
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </div>
    );
  };

  return <>{FormContents()}</>;
};
