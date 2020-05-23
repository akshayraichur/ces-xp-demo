import Axios from "axios";

export const getCreatorDetails = (creator) => {
  return Axios.get(`http://localhost:4000/api/user/get-creator/${creator}`)
    .then(
      (data) => data.data,
    ).catch((err) => err);
};
