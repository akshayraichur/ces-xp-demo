import axios from "axios";

export const getAllWorkshop = () => {
  return axios.get(`http://localhost:4000/api/workshop/get-workshops`)
    .then((data) => data.data).catch((err) => err);
};

export const getSingleWorkshop = (wid) => {
  return axios.get(`http://localhost:4000/api/workshop/get-a-workshop/${wid}`)
    .then((data) => data.data).catch((err) => err);
};
