import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SpinnerDiv, Spinner } from "../styled-components/spinner";

// Need to create action for posting video
import { postVideo } from "../store/actions";
import style from "styled-components";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";

const CreateVideo = props => {
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

  const [selectedSong, setSelectedSong] = useState({
    title_short: "",
    preview: "",
    artist: "",
    deezer_id: "",
    location: "youtube.com/video",
    video_title: "",
    user_id: localStorage.getItem("user_id")
  });

  const fullQuery = `${API_URL}${query}`;

  const getInfo = () => {
    console.log(fullQuery);
    axiosWithAuth()
      .get(`${fullQuery}&limit=7`)
      .then(res => {
        console.log("res", res);
        setResults(res.data.data);
      })
      .catch(err => {
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

  const handleTitleChange = event => {
    setVideoTitle({ [event.target.name]: event.target.value });
    setTitleLoading(true);
  };

  const handleClickSong = event => {
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

  const submitForm = event => {
    event.preventDefault();
    // Need to create postVideo action in redux for this to work
    props.postVideo(localStorage.getItem("token"), selectedSong, props.history);
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
          onChange={handleTitleChange}
        />
        <label htmlFor="title">Song</label>
        <input
          placeholder="Search Artist and/or Song Title"
          onChange={handleSongChange}
        />

        <ul>
          {results && results.length > 0
            ? results.map((res, index) => (
                <li onClick={handleClickSong} key={index} data-index={index}>
                  {res.artist.name} - {res.title}
                </li>
              ))
            : console.log("broken")}
        </ul>
        <div className="selected_song">
          {selectedSong.artist !== ''  && songLoading === false
            ? (
                <div>
                  <h1>Selected Song</h1>
                  <h3>
                    {selectedSong.artist} - {selectedSong.title_short}
                  </h3>
                </div>
              )
            : console.log("Hi")}
        </div>
        <div className="submit_button">
          {selectedSong.artist !== ''  && videoTitle.title !== '' && titleLoading === true && songLoading === false
            ? (
                  <button type="submit">Submit</button>
              )
            : console.log("Hi")}
        </div>
      </form>
      {props.postVideoStart && (
        <SpinnerDiv>
          <Spinner color="success" />
        </SpinnerDiv>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  postVideoError: state.postVideoError,
  postVideoStart: state.postVideoStart,
});

export default connect(mapStateToProps, { postVideo })(withRouter(CreateVideo));

// export default connect(mapStateToProps, {})(
//   withRouter(CreateVideo)
// );
