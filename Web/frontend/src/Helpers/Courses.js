import Axios from "axios";

export const getCourses = () => {
  return Axios.get(`http://localhost:4000/api/course/get-course`)
    .then((data) => data.data)
    .catch((err) => err);
};

export const getSingleCourse = (coid) => {
  return Axios.get(`http://localhost:4000/api/course/get-single-course/${coid}`)
    .then((data) => data.data)
    .catch((err) => err);
};

export const postACourse = (formData, access_token) => {
  return Axios.post(`http://localhost:4000/api/course/add-course`, formData, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((data) => data.data)
    .catch((err) => err);
};

export const editCourse = (formData, coid, access_token) => {
  return Axios.patch(
    `http://localhost:4000/api/course/edit/${coid}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((data) => data.data).catch((err) => err);
};

export const deleteCourse = (coid, access_token) => {
  return Axios.delete(
    `http://localhost:4000/api/course/delete/${coid}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((data) => data.data).catch((err) => err);
};
