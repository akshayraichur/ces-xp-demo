import axios from "axios";

export const getAllWorkshop = () => {
  return axios
    .get(`http://localhost:4000/api/workshop/get-workshops`)
    .then((data) => data.data)
    .catch((err) => err);
};

export const getSingleWorkshop = (wid) => {
  return axios
    .get(`http://localhost:4000/api/workshop/get-a-workshop/${wid}`)
    .then((data) => data.data)
    .catch((err) => err);
};

export const postAWorkshop = (formData, access_token) => {
  return axios
    .post(`http://localhost:4000/api/workshop/add-workshop`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((data) => data.data)
    .catch((err) => err);
};
