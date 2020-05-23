import Axios from "axios";

export const getCourses = () => {
  return Axios.get(`http://localhost:4000/api/course/get-course`).then(
    (data) => data.data,
  )
    .catch((err) => err);
};

export const getSingleCourse = (coid) => {
  return Axios.get(`http://localhost:4000/api/course/get-single-course/${coid}`)
    .then((data) => data.data).catch((err) => err);
};
