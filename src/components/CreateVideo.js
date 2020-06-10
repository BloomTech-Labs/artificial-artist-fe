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

  const [slider, setSlider] = useState(25);

  const [selectedSong, setSelectedSong] = useState({
    title_short: "",
    preview: "",
    artist: "",
    deezer_id: "",
    location: "youtube.com/video",
    video_title: "",
    user_id: localStorage.getItem("user_id"),
    slider: ""
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
    props.postVideo(localStorage.getItem("token"), selectedSong, props.history);
  };

  const handleClickOptions = (event) => {
    event.preventDefault();
    const optionsClicked_new = !optionsClicked;
    setOptionsClicked(optionsClicked_new);
  };

  const handleImgCatChange = (event) => {
    event.preventDefault();
  };

  const handleSliderChange = (event) => {
    event.preventDefault();
    setSlider(event.target.value);
    setSelectedSong({
      ...selectedSong,
      slider: event.target.value
    })
    console.log(selectedSong)
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
          {selectedSong.artist !== "" && songLoading === false ? (
            <div>
              <h1>Selected Song</h1>
              <h3>
                {selectedSong.artist} - {selectedSong.title_short}
              </h3>
            </div>
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
              <button type="submit">Submit</button>
              <button onClick={handleClickOptions}>Advanced</button>
            </div>
          ) : (
            console.log("Hi")
          )}
        </div>
        <div className="advanced_options">
          {optionsClicked === true ? (
            <div className="options">
              <div className="image_category">
                <label>
                  Image Category
                  <select onChange={handleImgCatChange}>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                    <option value="four">Four</option>
                    <option value="five">Five</option>
                  </select>
                </label>
              </div>
              <div className="jitter">
                <label>
                  Slide Away
                  <input type="range" min={1} max={100} value={slider} onChange={handleSliderChange} />
                  <div>{slider}</div>
                </label>
              </div>
              <div className="depth">
                <label>
                  Slide Away
                  <input type="range" min={1} max={100} value={slider} onChange={handleSliderChange} />
                  <div>{slider}</div>
                </label>
              </div>
              <div className="truncation">
                <label>
                  Slide Away
                  <input type="range" min={1} max={100} value={slider} onChange={handleSliderChange} />
                  <div>{slider}</div>
                </label>
              </div>
              <div className="pitch">
                <label>
                  Slide Away
                  <input type="range" min={1} max={100} value={slider} onChange={handleSliderChange} />
                  <div>{slider}</div>
                </label>
              </div>
              <div className="tempo">
                <label>
                  Slide Away
                  <input type="range" min={1} max={100} value={slider} onChange={handleSliderChange} />
                  <div>{slider}</div>
                </label>
              </div>
              <div className="smooth">
                <label>
                  Slide Away
                  <input type="range" min={1} max={100} value={slider} onChange={handleSliderChange} />
                  <div>{slider}</div>
                </label>
              </div>
            </div>
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
