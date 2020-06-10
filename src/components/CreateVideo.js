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

  const [jit, setJit] = useState(0.5);
  const [deep, setDeep] = useState(1);
  const [truncate, setTruncate] = useState(0.5);
  const [pitch, setPitch] = useState(220);
  const [tempo, setTempo] = useState(0.25);
  const [smooth, setSmooth] = useState(20);

  const [selectedSong, setSelectedSong] = useState({
    title_short: "",
    preview: "",
    artist: "",
    deezer_id: "",
    location: "youtube.com/video",
    video_title: "",
    user_id: localStorage.getItem("user_id"),
    im_group: "",
    jitter: 0.5,
    depth: 1,
    truncation: 0.5,
    pitch_sensitivity: 220,
    tempo_sensitivity: 0.25,
    smooth_factor: 20
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

  const hanldeJitChange = event => {
    setJit(event.target.value);
    setSelectedSong({...selectedSong, jitter: jit});
  };

  const hanldeDeepChange = event => {
    setDeep(event.target.value);
    setSelectedSong({...selectedSong, depth: deep});
  };

  const hanldeTruncateChange = event => {
    setTruncate(event.target.value);
    setSelectedSong({...selectedSong, truncation: truncate})
  };

  const hanldePitchChange = event => {
    setPitch(event.target.value);
    setSelectedSong({...selectedSong, pitch_sensitivity: pitch})
  };

  const hanldeTempoChange = event => {
    setTempo(event.target.value);
    setSelectedSong({...selectedSong, tempo_sensitivity: tempo})
  };

  const hanldeSmoothChange = event => {
    setSmooth(event.target.value);
    setSelectedSong({...selectedSong, smooth_factor: smooth})
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
                  Jitter
                  <input type="range" min={0} max={1} value={jit} onChange={hanldeJitChange} />
                  <div>{jit}</div>
                </label>
              </div>
              <div className="depth">
                <label>
                  Depth
                  <input type="range" min={0.1} max={1} value={deep} onChange={hanldeDeepChange} />
                  <div>{deep}</div>
                </label>
              </div>
              <div className="truncation">
                <label>
                  Truncation
                  <input type="range" min={0.1} max={1} value={truncate} onChange={hanldeTruncateChange} />
                  <div>{truncate}</div>
                </label>
              </div>
              <div className="pitch">
                <label>
                  Pitch Sensitivity
                  <input type="range" min={200} max={295} value={pitch} onChange={hanldePitchChange} />
                  <div>{pitch}</div>
                </label>
              </div>
              <div className="tempo">
                <label>
                  Tempo Sensitivity
                  <input type="range" min={0.05} max={0.8} value={tempo} onChange={hanldeTempoChange} />
                  <div>{tempo}</div>
                </label>
              </div>
              <div className="smooth">
                <label>
                  Smooth Factor
                  <input type="range" min={10} max={30} value={smooth} onChange={hanldeSmoothChange} />
                  <div>{smooth}</div>
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
