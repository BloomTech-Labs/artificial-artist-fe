import React, { useState, useEffect } from "react";
import style from "styled-components";
import SingleVideoPage from "./SingleVideoPage";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Loading = (props) => {
  const { bgcolor, completed } = props;

  return (
    <div>
      <div>
        <span>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default Loading;
