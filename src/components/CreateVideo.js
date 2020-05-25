import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SpinnerDiv, Spinner } from "../styled-components/spinner";
import Loading from "./Loading";

// Need to create action for posting video
import { postVideo } from "../store/actions";
import style from "styled-components";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";

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

  const [selectedSong, setSelectedSong] = useState({
    title_short: "",
    preview: "",
    artist: "",
    deezer_id: "",
    location: "youtube.com/video",
    video_title: "",
    user_id: localStorage.getItem("user_id"),
  });

  const [isLoading, setIsLoading] = useState(false);

  const fullQuery = `${API_URL}${query}`;

  const getInfo = () => {
    console.log(fullQuery);
    axiosWithAuth()
      .get(`${fullQuery}&limit=7`)
      .then((res) => {
        console.log("res", res);
        setIsLoading(false);
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
    setQuery(event.target.value);
  };

  const handleTitleChange = (event) => {
    setVideoTitle({ [event.target.name]: event.target.value });
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
  };

  const submitForm = (event) => {
    event.preventDefault();
    setIsLoading(true);
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
        {!isLoading && <button type="submit">Submit</button>}
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
