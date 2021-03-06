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

export const editAWorkshop = (formData, wid, access_token) => {
  return axios
    .patch(`http://localhost:4000/api/workshop/edit/${wid}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((data) => data.data)
    .catch((err) => err);
};

export const deleteWorkshop = (wid, access_token) => {
  return axios.delete(`http://localhost:4000/api/workshop/delete/${wid}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(
    (data) => data.data,
  ).catch((err) => err);
};
