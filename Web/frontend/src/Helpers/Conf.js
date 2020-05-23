import Axios from "axios";

export const getConf = () => {
  return Axios.get(`http://localhost:4000/api/conference/get-conferences`)
    .then((data) => data.data)
    .catch((err) => err);
};

export const getAConf = (cid) => {
  return Axios.get(
    `http://localhost:4000/api/conference/get-a-conference/${cid}`
  )
    .then((data) => data.data)
    .catch((err) => err);
};

export const postAConference = (formData, access_token) => {
  return Axios.post(
    `http://localhost:4000/api/conference/add-conference`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
    .then((data) => data.data)
    .catch((err) => err);
};
