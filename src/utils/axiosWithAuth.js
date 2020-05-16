import axios from "axios";
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: `process.env.BASEURL`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  });
};
