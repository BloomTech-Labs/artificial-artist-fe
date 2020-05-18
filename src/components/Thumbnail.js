import React from "react";
import Video from "./Video";

const videoThumb = {
  flex: "0 1 30vw",
  width: "30vw",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Thumbnail = (props) => {
  function getCanvasThumbnail(link) {
    let thumbnail; //= canvas X html5 X link
    return [thumbnail];
  }
  const [thumbnail] = getCanvasThumbnail(props.video.location);

  return (
    <div >
      <ul>
        <li>{props.video.title}</li>
        <li>{props.video.artist_name}</li>
        <li>

          <video style={videoThumb}  controls>
            <source src={`${props.video.location}#t=20`} />
          </video>
        </li>
      </ul>
    </div>
  );
};

export default Thumbnail;
