import axios from "axios";

export const getAllWorkshop = () => {
  return axios.get(`http://localhost:4000/api/workshop/get-workshops`)
    .then((data) => data.data).catch((err) => err);
};
