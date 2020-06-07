import React from "react";
import Video from "./Video";

const videoThumb = {
  flex: "0 1 30vw",
  width: "30vw",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const Thumbnail = props => {
  function getCanvasThumbnail(link) {
    let thumbnail; //= canvas X html5 X link
    return [thumbnail];
  }
  const [thumbnail] = getCanvasThumbnail(props.video.location);

  return (
    <div>
      <ul>
        <video style={videoThumb} controls>
          <source src={`${props.video.location}#t=20`} />
        </video>
      </ul>
    </div>
  );
};

export default Thumbnail;
