import React from "react";
import style from "styled-components";

const Loading = props => {
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
