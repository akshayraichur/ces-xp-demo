import React, { useContext, useState, useEffect } from "react";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory, useParams } from "react-router-dom";
import Message from "../../Components/Message";
import { getSingleCourse, editCourse } from "../../Helpers/Courses";

export const EditCourse = () => {
  const { access_token } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  // eslint-disable-next-line
  const [err, setErr] = useState(null);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);

  const [courses, setCourse] = useState({});

  const [uCourse, setUCourse] = useState({
    title: "",
    description: "",
    price: "",
    venue: "",
    dateOfCourse: "",
  });

  const history = useHistory();

  const { coid } = useParams();

  const onChangeHandler = (e) => {
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    getSingleCourse(coid).then((data) => {
      if (data.err) {
        setErr(data.err);
      } else {
        setUCourse({
          ...uCourse,
          title: data.course.name,
          description: data.course.description,
          price: data.course.price,
          venue: data.course.venue,
          dateOfCourse: data.course.dateOfCourse,
        });
      }
    });
  }, [coid]);

  const onSubmitHandler = (values) => {
    const formData = new FormData();
    formData.append("name", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("venue", values.venue);
    formData.append("dateOfCourse", values.dateOfCourse);
    formData.append("courseImg", img);

    editCourse(formData, coid, access_token)
      .then((data) => {
        if (data.err) {
          setErr(data.err);
        } else {
          setSuccess(true);
          setCourse(data.course);
          history.push("/courses");
        }
      })
      .catch((err) => err);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    dateOfCourse: Yup.string().required("Required"),
    venue: Yup.string().required("Venue is required"),
  });

  const initialValues = {
    title: uCourse.title,
    description: uCourse.description,
    price: uCourse.price,
    dateOfCourse: uCourse.dateOfCourse,
    venue: uCourse.venue,
  };

  const formContents = () => {
    return (
      <div>
        <Container component="main" maxWidth="xs" className="my-5">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h2 className="h2-responsive text-center">Edit Course!</h2>
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
                    name="dateOfCourse"
                    id="dateOfCourse"
                    label="Date"
                    className="my-2"
                  />
                  <ErrorMessage name="dateOfCourse" as={Message} />

                  <h3 className="h5-responsive">
                    Choose a cover image to attract customers
                  </h3>
                  <input
                    type="file"
                    name="courseImg"
                    id="courseImg"
                    label="courseImg"
                    className="my-2"
                    onChange={(e) => onChangeHandler(e)}
                    accept="image/png, image/jpeg, image/jpg"
                  />

                  <Button type="submit" variant="outlined" color="primary">
                    Update Course
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
