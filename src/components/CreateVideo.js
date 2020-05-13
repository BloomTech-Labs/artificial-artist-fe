import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Need to create action for posting video
// import { postVideo } from "../store/actions";
import style from "styled-components";

import Searchbar from "./Searchbar"

const CreateVideo = props => {
  const [video, setVideo] = useState({
    title: "",
    song: "",
    artist: ""
  });

  const handleChanges = event => {
    setVideo({ ...video, [event.target.name]: event.target.value });
    console.log(event.target.name);
  };

  const submitForm = (event) => {
    event.preventDefault();
    // Need to create postVideo action in redux for this to work
    // props.postVideo(
    //     localStorage.getItem("token"),
    //     video,
    //     props.history
    // );
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Title</label>
        <input
          required
          id="title"
          name="title"
          placeholder="Title Your Video"
          type="text"
          onChange={handleChanges}
          value={video.title}
        />
        <label htmlFor="title">Song</label>
        <Searchbar />
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  //   postVideoError: state.postVideoError,
  //   postVideoStart: state.postVideoStart,
});

// export default connect(mapStateToProps, { postVideo })(
//   withRouter(CreateVideo)
// );

export default connect(mapStateToProps, {})(
  withRouter(CreateVideo)
);
