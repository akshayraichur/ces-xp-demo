import axios from "axios";

export const register = (formData) => {
  return axios
    .post(`${process.env.REACT_APP_AUTH_API_KEY}/register`, formData)
    .then((data) => data)
    .catch((err) => err);
};

export const signin = (formData) => {
  return axios
    .post(
      `${process.env.REACT_APP_AUTH_API_KEY}/login`,
      formData,
      { withCredentials: true },
    )
    .then((data) => data)
    .catch((err) => err);
};

export const Logout = () => {
  return axios.post().then().catch();
};

export const Authenticate = () => {
  return axios.get(
    `${process.env.REACT_APP_AUTH_API_KEY}/authenticate`,
    { withCredentials: true },
  ).then((data) => data.data).catch((err) => err);
};
