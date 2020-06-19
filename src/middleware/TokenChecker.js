import jwt from "jsonwebtoken";

export const TokenChecker = () => {
  //Check if the user has recieved their login token
  let token = jwt.decode(localStorage.getItem("token"));

  if (token) {
    console.log("here's your token");
    //Verify the token's expiration against Date.now
    if (token.exp * 1000 > Date.now()) {
      //The login is still valid
      console.log("valid login");
    }
    return token;
  }
};
