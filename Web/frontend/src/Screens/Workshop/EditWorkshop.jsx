import React, { useContext, useState, useEffect } from "react";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { editAWorkshop, getSingleWorkshop } from "../../Helpers/Workshop";
import { useHistory, useParams } from "react-router-dom";
import Message from "../../Components/Message";

export const EditWorkshop = () => {
  const { access_token } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  // eslint-disable-next-line
  const [err, setErr] = useState(null);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [workshop, setWorkshop] = useState({});
  // eslint-disable-next-line
  const [uworkshop, setUworkshop] = useState({
    title: "",
    description: "",
    price: "",
    venue: "",
    dateOfWorkshop: "",
  });

  const history = useHistory();

  const { wid } = useParams();

  const onChangeHandler = (e) => {
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    getSingleWorkshop(wid).then((data) => {
      if (data.err) {
        setErr(data.err);
      } else {
        setUworkshop({
          ...uworkshop,
          title: data.workshop.name,
          description: data.workshop.description,
          price: data.workshop.price,
          venue: data.workshop.venue,
          dateOfWorkshop: data.workshop.dateOfWorkshop,
        });
      }
    });
  }, []);

  const onSubmitHandler = (values) => {
    const formData = new FormData();
    formData.append("name", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("venue", values.venue);
    formData.append("dateOfWorkshop", values.dateOfWorkshop);
    formData.append("workshopImg", img);

    editAWorkshop(formData, wid, access_token)
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

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    dateOfWorkshop: Yup.string().required("Required"),
    venue: Yup.string().required("Venue is required"),
  });

  const initialValues = {
    title: uworkshop.title,
    description: uworkshop.description,
    price: uworkshop.price,
    dateOfWorkshop: uworkshop.dateOfWorkshop,
    venue: uworkshop.venue,
  };

  const formContents = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs" className="my-5">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h2 className="h2-responsive text-center">Edit Workshop!</h2>
            </Grid>

            <Grid item sx={12}>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
              >
                <Form>
                  <Field
                    fullWidth
                    as={TextField}
                    name="title"
                    variant="outlined"
                    id="title"
                    label="Title"
                    className="my-2"
                  />
                  <ErrorMessage name="title" as={Message} />
                  <Field
                    fullWidth
                    as={TextField}
                    variant="outlined"
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={9}
                    className="my-2"
                  />
                  <ErrorMessage name="description" as={Message} />
                  <Field
                    fullWidth
                    as={TextField}
                    variant="outlined"
                    id="price"
                    name="price"
                    label="Price"
                    className="my-2"
                  />
                  <ErrorMessage name="price" as={Message} />
                  <Field
                    fullWidth
                    as={TextField}
                    variant="outlined"
                    name="venue"
                    id="venue"
                    label="Venue"
                    className="my-2"
                  />
                  <ErrorMessage name="venue" as={Message} />
                  <Field
                    fullWidth
                    as={TextField}
                    variant="outlined"
                    name="dateOfWorkshop"
                    id="dateOfWorkshop"
                    label="Date"
                    className="my-2"
                  />
                  <ErrorMessage name="dateOfWorkshop" as={Message} />

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
                    Update Workshop
                  </Button>
                </Form>
              </Formik>
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
