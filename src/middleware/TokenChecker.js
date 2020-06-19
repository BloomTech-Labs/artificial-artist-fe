import jwt from "jsonwebtoken";

export const TokenChecker = () => {
  //Check if the user has recieved their login token
  let token = jwt.decode(localStorage.getItem("token"));

  if (token) {
    console.log("here's your token");
    return token;
  }
};
