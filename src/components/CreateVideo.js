import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postVideo } from "../store/actions";
import style from "styled-components";

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

    return (
      <>
        <form onSubmit={submitForm}>
          <label htmlFor="title">Title</label>
          <input
            required
            id="title"
            name="title"
            type="text"
            onChange={handleChanges}
            value={video.title}
          />

          <label htmlFor="song">Song</label>
          <input
            required
            id="song"
            name="song"
            type="text"
            onChange={handleChanges}
            value={video.song}
          />
        </form>
      </>
    );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  postVideoError: state.postVideoError,
  postVideoStart: state.postVideoStart,
});

export default connect(mapStateToProps, { postVideo })(
  withRouter(CreateVideo)
);
