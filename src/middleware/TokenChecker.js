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
    } else {
      //Delete the expired token, userID, username
      //(Possibly re-route to login page???)
      console.log("token expired");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
    }
  } else {
    //You do not have a token ecause you're not logged in
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    console.log("No Token, not logged in");
  }
  return token;
};
