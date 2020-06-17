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

  const [videoParams, setVideoParams] = useState({
    im_group: "RANDOM OBJECTS",
    jitter: 0.5,
    depth: 1,
    truncation: 0.5,
    pitch_sensitivity: 220,
    tempo_sensitivity: 0.25,
    smooth_factor: 20,
  });

  const [selectedSong, setSelectedSong] = useState({
    title_short: "",
    preview: "",
    artist: "",
    deezer_id: "",
    location: "youtube.com/video",
    video_title: "",
    user_id: localStorage.getItem("user_id"),
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
    props.postVideo(localStorage.getItem("token"), selectedSong, videoParams, props.history);
  };

  const handleClickOptions = (event) => {
    event.preventDefault();
    const optionsClicked_new = !optionsClicked;
    setOptionsClicked(optionsClicked_new);
  };

  const handleSliderChange = (event) => {
    console.log(event.target.name);
    setVideoParams({
      ...videoParams,
      [event.target.name]: Number(event.target.value),
    });
  }

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
                  <select
                    onChange={(event) =>
                      setVideoParams({
                        ...videoParams,
                        im_group: event.target.value,
                      })
                    }
                  >
                    <option value="RANDOM OBJECTS">Pick One</option>
                    <option value="FISH">FISH</option>
                    <option value="BIRDS">BIRDS</option>
                    <option value="AMPHIBIANS">AMPHIBIANS</option>
                    <option value="LIZARDS">LIZARDS</option>
                    <option value="SNAKES">SNAKES</option>
                    <option value="OCTOPED">OCTOPED</option>
                    <option value="EXOTIC BIRDS">EXOTIC BIRDS</option>
                    <option value="WEIRD MAMMALS">WEIRD MAMMALS</option>
                    <option value="SQUISHY SEA CREATURES">
                      SQUISHY SEA CREATURES
                    </option>
                    <option value="SHELLED SEA CREATURES">
                      SHELLED SEA CREATURES
                    </option>
                    <option value="FANCY BIRDS">FANCY BIRDS</option>
                    <option value="SEA MAMMALS">SEA MAMMALS</option>
                    <option value="UGLY DOGS">UGLY DOGS</option>
                    <option value="HOUND DOGS">HOUND DOGS</option>
                    <option value="TERRIER DOGS">TERRIER DOGS</option>
                    <option value="RETRIEVER DOGS">RETRIEVER DOGS</option>
                    <option value="RANDOM DOGS">RANDOM DOGS</option>
                    <option value="WOLVES">WOLVES</option>
                    <option value="HYAENAS">HYAENAS</option>
                    <option value="FOXY">FOXY</option>
                    <option value="DOMESTIC CATS">DOMESTIC CATS</option>
                    <option value="BIG CATS">BIG CATS</option>
                    <option value="BEAR">BEAR</option>
                    <option value="UNDERGROUND CATS">UNDERGROUND CATS</option>
                    <option value="BEETLES">BEETLES</option>
                    <option value="FLYING INSECTS">FLYING INSECTS</option>
                    <option value="BUTTERFLIES">BUTTERFLIES</option>
                    <option value="SHARP SEA STUFF">SHARP SEA STUFF</option>
                    <option value="SMALL MAMMALS">SMALL MAMMALS</option>
                    <option value="LARGE WILD ANIMALS">
                      LARGE WILD ANIMALS
                    </option>
                    <option value="RANDOM MAMMALS">RANDOM MAMMALS</option>
                    <option value="PRIMATES">PRIMATES</option>
                    <option value="AFRICAN ANIMALS">AFRICAN ANIMALS</option>
                    <option value="PANDAS">PANDAS</option>
                    <option value="CRAZY SEA CREATURES">
                      CRAZY SEA CREATURES
                    </option>
                    <option value="RANDOM OBJECTS">RANDOM OBJECTS</option>
                    <option value="WORDS AND SIGNS">WORDS AND SIGNS</option>
                    <option value="FOOD STUFF">FOOD STUFF</option>
                    <option value="GEOLOGICAL STUFF">GEOLOGICAL STUFF</option>
                    <option value="PEOPLE">PEOPLE</option>
                    <option value="FLOWERING THINGS">FLOWERING THINGS</option>
                    <option value="FUNGI">FUNGI</option>
                    <option value="TOILET PAPER">TOILET PAPER</option>
                  </select>
                </label>
              </div>
              <div className="jitter">
                <label>
                  Jitter
                  <input
                    type="range"
                    name="jitter"
                    min={0}
                    max={1}
                    step="0.05"
                    value={videoParams.jitter}
                    onChange={handleSliderChange}
                  />
                  <div>{videoParams.jitter}</div>
                </label>
              </div>
              <div className="depth">
                <label>
                  Depth
                  <input
                    type="range"
                    name="depth"
                    min={0.1}
                    max={1}
                    step="0.05"
                    value={videoParams.depth}
                    onChange={handleSliderChange}
                  />
                  <div>{videoParams.depth}</div>
                </label>
              </div>
              <div className="truncation">
                <label>
                  Truncation
                  <input
                    type="range"
                    name="truncation"
                    min={0.1}
                    max={1}
                    step="0.05"
                    value={videoParams.truncation}
                    onChange={handleSliderChange}
                  />
                  <div>{videoParams.truncation}</div>
                </label>
              </div>
              <div className="pitch">
                <label>
                  Pitch Sensitivity
                  <input
                    type="range"
                    name="pitch_sensitivity"
                    min={200}
                    max={295}
                    step="5"
                    value={videoParams.pitch_sensitivity}
                    onChange={handleSliderChange}
                  />
                  <div>{videoParams.pitch_sensitivity}</div>
                </label>
              </div>
              <div className="tempo">
                <label>
                  Tempo Sensitivity
                  <input
                    type="range"
                    name="tempo_sensitivity"
                    min={0.05}
                    max={0.8}
                    step="0.05"
                    value={videoParams.tempo_sensitivity}
                    onChange={handleSliderChange}
                  />
                  <div>{videoParams.tempo_sensitivity}</div>
                </label>
              </div>
              <div className="smooth">
                <label>
                  Smooth Factor
                  <input
                    type="range"
                    name="smooth_factor"
                    min={10}
                    max={30}
                    step="1"
                    value={videoParams.smooth_factor}
                    onChange={handleSliderChange}
                  />
                  <div>{videoParams.smooth_factor}</div>
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
