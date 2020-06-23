import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SpinnerDiv, Spinner } from "../styled-components/spinner";
import style from "styled-components";
import { postVideo } from "../store/actions";
import AdvancedOptions from "../components/AdvancedOptions";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";

const ContentCenter = style.div`
  margin: 0 auto;
  display: block;
  width: 30%;
  padding-bottom: 300px;
`;

const CreateVideoLabel = style.label`
  padding: 10px 15px;
  color: #44E0F6;
  font-size: 18px;
  display: block;
  font-weight: 800;
`;

const VideoList = style.ul`
  padding: 10px 15px;
  color: #44E0F6;
  font-size: 18px;
  display: block;
  font-weight: 800;
  list-style-type: none;
`;

const VideoInput = style.input`
  padding: 10px 15px;
  border: 2px solid #FCFC0B;
  border-radius: 8px;
  color: #FCFC0B;
  font-size: 24px;
  background-color: #0E0429;
  display: block;
  width: 100%;
  &:focus {
    border: 2px solid #44E0F6;
    outline: none;
  }
`;

const SelectedSong = style.div`
  padding: 10px 15px;
  border-radius: 8px;
  color: #FCFC0B;
  font-size: 20px;
  background-color: #0E0429;
  display: block;
  text-align: center;
  width: 100%;
`;

const VideoButton = style.button`
  padding: 20px 30px;
  color: #0E0429;
  border-radius: 8px;
  font-size: 18px;
  display: block;
  font-weight: 800;
  width: 100%;
  margin-top: 20px;
  border: 2px solid #FCFC0B;
  cursor: pointer;
  background: rgb(250,112,239);
  background: linear-gradient(180deg, rgba(250,112,239,1) 0%, rgba(254,235,251,1) 100%, rgba(2,0,36,1) 190755%);
  &:hover {
    background: rgb(254,235,251);
    background: radial-gradient(circle, rgba(254,235,251,1) 0%, rgba(250,112,239,1) 100%, rgba(2,0,36,1) 190755%);
  }
`;

const CreateVideo = (props) => {
  // const [video, setVideo] = useState({
  //   title: "",
  //   song: "",
  //   artist: ""
  // });

  // const handleChanges = event => {
  //   setVideo({ ...video, [event.target.name]: event.target.value });
  //   console.log(event.target.name);
  // };

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [videoTitle, setVideoTitle] = useState("");

  const [songLoading, setSongLoading] = useState(false);

  const [titleLoading, setTitleLoading] = useState(false);

  const [optionsClicked, setOptionsClicked] = useState(false);

  // const [jitHover, setJitHover] = useState(false);
  // const [deepHover, setDeepHover] = useState(false);
  // const [truncateHover, setTruncateHover] = useState(false);
  // const [pitchHover, setPitchHover] = useState(false);
  // const [tempoHover, setTempoHover] = useState(false);
  // const [smoothHover, setSmoothHover] = useState(false);

  // const [videoParams, setVideoParams] = useState({
  //   im_group: "RANDOM OBJECTS",
  //   jitter: 0.5,
  //   depth: 1,
  //   truncation: 0.5,
  //   pitch_sensitivity: 220,
  //   tempo_sensitivity: 0.25,
  //   smooth_factor: 20,
  // });

  const [selectedSong, setSelectedSong] = useState({
    title_short: "",
    preview: "",
    artist: "",
    deezer_id: "",
    location: "youtube.com/video",
    video_title: "",
    user_id: localStorage.getItem("user_id"),
    im_group: "RANDOM OBJECTS",
    jitter: 0.5,
    depth: 1,
    truncation: 0.5,
    pitch_sensitivity: 220,
    tempo_sensitivity: 0.25,
    smooth_factor: 20,
  });

  const fullQuery = `${API_URL}${query}`;

  const getInfo = () => {
    console.log(fullQuery);
    axiosWithAuth()
      .get(`${fullQuery}&limit=7`)
      .then((res) => {
        console.log("res", res);
        setResults(res.data.data);
      })
      .catch((err) => {
        console.log("unable to suggest artist and/or song", err);
      });
  };

  useEffect(() => {
    if (query.length >= 2) getInfo();
  }, [query]);

  const handleSongChange = (event) => {
    setSongLoading(true);
    setQuery(event.target.value);
  };

  const handleTitleChange = (event) => {
    setVideoTitle({ [event.target.name]: event.target.value });
    setTitleLoading(true);
  };

  const handleClickSong = (event) => {
    const songItem = event.target.getAttribute("data-index");
    setSelectedSong({
      ...selectedSong,
      title_short: results[songItem].title_short,
      preview: results[songItem].preview,
      artist: results[songItem].artist.name,
      deezer_id: results[songItem].id,
      video_title: videoTitle.title,
    });

    setSongLoading(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    // Need to create postVideo action in redux for this to work
    console.log(selectedSong);
    props.postVideo(localStorage.getItem("token"), selectedSong, props.history);
  };

  const handleClickOptions = (event) => {
    event.preventDefault();
    const optionsClicked_new = !optionsClicked;
    setOptionsClicked(optionsClicked_new);
  };

  const handleVideoParams = (event) => {
    setSelectedSong({
      ...selectedSong,
      im_group: event.im_group,
      jitter: event.jitter,
      depth: event.depth,
      truncation: event.truncation,
      pitch_sensitivity: event.pitch_sensitivity,
      tempo_sensitivity: event.tempo_sensitivity,
      smooth_factor: event.smooth_factor,
    });
  };

  const handleTest = (e) => {
    e.preventDefault();
    console.log(selectedSong);
  };

  return (
    <>
      <button onClick={handleTest}>CLICK ME!!!</button>
      <ContentCenter>
        <form onSubmit={submitForm}>
          <CreateVideoLabel htmlFor="title">Title</CreateVideoLabel>
          <VideoInput
            required
            id="title"
            name="title"
            placeholder="Title Your Video"
            type="text"
            onChange={handleTitleChange}
          />
          <CreateVideoLabel htmlFor="title">Song</CreateVideoLabel>
          <VideoInput
            placeholder="Search Artist and/or Song Title"
            onChange={handleSongChange}
          />

          <VideoList>
            {results && results.length > 0
              ? results.map((res, index) => (
                  <li onClick={handleClickSong} key={index} data-index={index}>
                    {res.artist.name} - {res.title}
                  </li>
                ))
              : console.log("broken")}
          </VideoList>
          <div className="selected_song">
            {selectedSong.artist !== "" && songLoading === false ? (
              <SelectedSong>
                <h3>
                  {selectedSong.artist} - {selectedSong.title_short}
                </h3>
              </SelectedSong>
            ) : (
              console.log("Hi")
            )}
          </div>
          <div className="buttons">
            {selectedSong.artist !== "" &&
            videoTitle.title !== "" &&
            titleLoading === true &&
            songLoading === false ? (
              <div>
                <VideoButton type="submit">Submit</VideoButton>
                <VideoButton onClick={handleClickOptions}>Advanced</VideoButton>
              </div>
            ) : (
              console.log("Hi")
            )}
          </div>
          <div className="advanced_options">
            {optionsClicked === true ? (
              <AdvancedOptions onChange={handleVideoParams} />
            ) : (
              console.log("Hooray")
            )}
          </div>
        </form>
        {props.postVideoStart && (
          <SpinnerDiv>
            <Spinner color="success" />
          </SpinnerDiv>
        )}
      </ContentCenter>
    </>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  postVideoError: state.postVideoError,
  postVideoStart: state.postVideoStart,
});

// export default connect(mapStateToProps, { postVideo })(withRouter(CreateVideo));

export default connect(mapStateToProps, {
  postVideo,
})(withRouter(CreateVideo));

// export default connect(mapStateToProps, {})(
//   withRouter(CreateVideo)
// );
