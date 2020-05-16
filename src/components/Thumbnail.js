import React from "react";
import style from "styled-components";

const videoThumb = {
  flex: "0 1 30vw",
  width: "30vw",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const Thumbnail = (props) => {
  function getYoutubeThumb(link) {
    let youtubeID = link.replace("https://www.youtube.com/watch?v=", "");
    let thumbnailHQ = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`;
    let thumbnailSD = `https://img.youtube.com/vi/${youtubeID}/sddefault.jpg`;
    return [thumbnailHQ, thumbnailSD, youtubeID];
  }
  const [thumbnailHQ, thumbnailSD, youtubeID] = getYoutubeThumb(
    props.video.location
  );
  console.log({ youtubeID }, { thumbnailSD }, { thumbnailHQ });
  return (
    <div className="videoThumb">
      <ul>
        <li>{props.video.title}</li>
        <li>{props.video.artist_name}</li>
        <img
          style={videoThumb}
          src={thumbnailHQ}
          alt={
            thumbnailSD || `${props.video.title} by ${props.video.artist_name}`
          }
        />
      </ul>
    </div>
  );
};
