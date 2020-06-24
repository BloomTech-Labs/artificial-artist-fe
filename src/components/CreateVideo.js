import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SpinnerDiv, Spinner } from "../styled-components/spinner";
import style from "styled-components";
import { postVideo } from "../store/actions";
import AdvancedOptions from "../components/AdvancedOptions";
import SecondaryNav from "./SecondaryNav";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";

const Container = style.div`
  margin: 0 auto;
  width: 60%;
  padding: 20px 0 60px;
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

const ListItem = style.li`
  cursor: pointer;
  font-family: "Gibson Bold";
  padding-bottom: 40px;
  text-align: center;
  -webkit-text-fill-color: #7DFA9B;
  -webkit-text-stroke-color: #44E0F6;
  -webkit-text-stroke-width: 1.00px;
  color: #7DFA9B;
  font-size: 30px;
  &:hover {
    -webkit-text-stroke-color: #190755;
  }
`;

const VideoInput = style.input`
  padding: 15px 20px;
  border: none;
  border-bottom: 2px solid #FCFC0B;
  color: #FCFC0B;
  font-size: 24px;
  border-radius: 30px;
  margin-bottom: 20px;
  background-color: #0E0429;
  display: block;
  width: 100%;
  &:focus {
    border: 2px solid #44E0F6;
    outline: none;
  }
`;

const Form = style.form`
  display: flex;
`;

const FieldContainer = style.div`
  width: 50%;
`;

const ResultsContainer = style.div`
  width: 50%;
`;

const Selection = style.h2`
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.50px; 
  width: 100%;
  padding: 20px 0;
  text-align: center;
`;

const VideoButton = style.button`
  background-color: #4499F6;
  color: #FCFC0B; 
  border-radius: 30px;
  border: 0;
  width: 100%;
  font-family: "Gibson Bold";
  box-shadow: 0 20px 40px 0 rgba(0,0,0,.4);
  padding: 15px 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 26px;
  &:hover {
    background-color: #F14946;
  }
`;

const ResetDefaults = style.button`
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
  background: transparent;
  border: none;
  font-family: "Gibson Bold";
  cursor: pointer;
  color: #FF1313;
`;

const Advanced = style.button`
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
  background: transparent;
  border: none;
  font-family: "Gibson Bold";
  cursor: pointer;  
  color: #4499F6;
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

  return (
    <>
      <Container>
        <SecondaryNav />
        <Form onSubmit={submitForm}>
          <FieldContainer>
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
            {selectedSong.artist !== "" && songLoading === false ? (
              <Selection>
                {selectedSong.artist} - {selectedSong.title_short}
              </Selection>
            ) : (
              console.log("No Selection")
            )}
             <div className="buttons">
              {selectedSong.artist !== "" &&
              videoTitle.title !== "" &&
              titleLoading === true &&
              songLoading === false ? (
                <div>
                  <VideoButton type="submit">Submit</VideoButton>
                  <Advanced onClick={handleClickOptions}>Advanced</Advanced>
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
          </FieldContainer>
          <ResultsContainer>
            <VideoList>
              {results && results.length > 0
                ? results.map((res, index) => (
                    <ListItem
                      onClick={handleClickSong}
                      key={index}
                      data-index={index}
                    >
                      {res.artist.name} - {res.title}
                    </ListItem>
                  ))
                : console.log("")}
            </VideoList>
          </ResultsContainer>
        </Form>
        {props.postVideoStart && (
          <SpinnerDiv>
            <Spinner color="success" />
          </SpinnerDiv>
        )}
      </Container>
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
