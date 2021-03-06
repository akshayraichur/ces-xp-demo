import React, { useContext, useState } from "react";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { postAWorkshop } from "../../Helpers/Workshop";
import { useHistory } from "react-router-dom";
import Message from "../../Components/Message";

export const AddWorkshop = () => {
  const { access_token } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  // eslint-disable-next-line
  const [err, setErr] = useState(null);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [workshop, setWorkshop] = useState({});

  const history = useHistory();

  const onChangeHandler = (e) => {
    setImg(e.target.files[0]);
  };

  const onSubmitHandler = (values) => {
    const formData = new FormData();
    formData.append("name", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("venue", values.venue);
    formData.append("dateOfWorkshop", values.dateOfWorkshop);
    formData.append("workshopImg", img);

    postAWorkshop(formData, access_token)
      .then((data) => {
        if (data.err) {
          setErr(data.err);
        } else {
          setSuccess(true);
          setWorkshop(data.workshop);
          history.push("/workshops");
        }
      })
      .catch((err) => err);
  };

  const validation = () => {
    return Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      dateOfWorkshop: Yup.string().required("Required"),
      venue: Yup.string().required("Venue is required"),
    });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      dateOfWorkshop: "",
      venue: "",
    },
    validationSchema: validation,
    onSubmit: onSubmitHandler,
  });

  const formContents = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs" className="my-5">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h2 className="h2-responsive text-center">Add Workshop!</h2>
            </Grid>

            <Grid item sx={12}>
              <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  error={
                    formik.errors.title && formik.touched.title ? true : false
                  }
                  name="title"
                  id="title"
                  variant="filled"
                  label="Title"
                  className="my-2"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  fullWidth
                  error={
                    formik.errors.description && formik.touched.description
                      ? true
                      : false
                  }
                  variant="filled"
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={9}
                  className="my-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <TextField
                  fullWidth
                  error={
                    formik.errors.price && formik.touched.price ? true : false
                  }
                  variant="filled"
                  id="price"
                  name="price"
                  label="Price"
                  className="my-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                <TextField
                  fullWidth
                  error={
                    formik.errors.venue && formik.touched.venue ? true : false
                  }
                  variant="filled"
                  name="venue"
                  id="venue"
                  label="Venue"
                  className="my-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.venue}
                />
                <TextField
                  fullWidth
                  error={
                    formik.errors.dateOfWorkshop &&
                    formik.touched.dateOfWorkshop
                      ? true
                      : false
                  }
                  variant="filled"
                  name="dateOfWorkshop"
                  id="dateOfWorkshop"
                  label="Date"
                  className="my-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfWorkshop}
                />

                <h3 className="h5-responsive">
                  Choose a cover image to attract customers
                </h3>
                <input
                  type="file"
                  name="workshopImg"
                  id="workshopImg"
                  label="workshopImg"
                  className="my-2"
                  onChange={(e) => onChangeHandler(e)}
                  accept="image/png, image/jpeg, image/jpg"
                />

                <Button type="submit" variant="outlined" color="primary">
                  Add Workshop
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

  return (
    <>
      {formContents()}
      {err ? <Message ErrorMessage={err} severity="error" open={true} /> : null}
    </>
  );
};
