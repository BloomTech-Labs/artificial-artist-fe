// import React, { useState, useEffect } from "react";
// import style from "styled-components";
// import SingleVideoPage from "./SingleVideoPage";
// import { axiosWithAuth } from "../utils/axiosWithAuth";

// const Loading = ({ setIsLoading, props }) => {
//   const { bgcolor, completed } = props;
//   const { location } = state;

//   useEffect(() => {
//     axiosWithAuth
//       .get("/video/:id")
//       .then((res) => {
//         console.log(res);
//         if (location.status === null) {
//           const pingTimerId = setTimeout(() => {
//             setIsLoading(false);
//           }, 5000);
//         } else if ((location.status = "url")) {
//           return setIsLoading(videoData);
//         }
//       })
//       .catch((err) => {
//         console.log("Server error while getting video", err);
//       });

//     return () => {
//       clearTimeout(pingTimerId);
//     };
//   });

//   return (
//     <div>
//       <div>
//         <span>{`${completed}%`}</span>
//       </div>
//     </div>
//   );
// };

// export default Loading;
