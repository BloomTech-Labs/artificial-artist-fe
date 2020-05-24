import axios from "axios";
export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  });
};
