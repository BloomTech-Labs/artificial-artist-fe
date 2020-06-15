import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { getVideos } from "../store/actions";
import Fuse from "fuse.js";
import VideoList from "./VideoList";

function Search(props) {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // useEffect(() => {
  //   async function preload() {
  //     try {
  //       await getVideos();
  //       console.log(props.videos);
  //     } catch (err) {
  //       console.log(err, "i dont work");
  //     }
  //   }
  //   preload();
  // }, []);

  useEffect(() => {
    props.getVideos();
  }, []);

  useEffect(() => {
    if (props.videos && props.videos.length > 0) {
      setResults(fuse.search(query));
    }
    console.log(query, "I work second");
  }, [query]);

  const handleSelect = (e) => {
    const searchedItemIndex = e.target.getAttribute("data-index");
    const searchedItem = results[searchedItemIndex];
    history.push("/videos", { searchedItem });
  };

  // const renderItems = () => {
  //   return results.length > 0 ? (
  //     results.map((item, i) => {
  //       return (
  //         <li onClick={handleSelect} key={i} data-index={i}>
  //           {item.id}---{item.title}
  //         </li>
  //       );
  //     })
  //   ) : (
  //     <div>
  //       <h4>No matching video found</h4>
  //       <VideoList />
  //     </div>
  //   );
  // };

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    includeScore: true,
    // location: 0,
    // distance: 50,
    // maxPatternLength: 12,
    minMatchCharLength: 2,
    keys: ["title", "video_title", "artist_name"],
  };

  const fuse = new Fuse(props.videos, fuseOptions);

  //const results = fuse.search(query);

  // const videoResults = query ? (
  //   results.map((video) => video.item)
  // ) : (
  //   <VideoList />
  // );

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <>
      <div>
        <h2>Video Search</h2>
        <form className="video_search">
          <input
            id="video"
            name="video"
            type="text"
            value={query}
            placeholder="Search Video, Artist or Song Name"
            onChange={handleSearch}
          />
        </form>
        <div>
          {results && results.map((result) => <h1>{result.item.title}</h1>)}
        </div>

        <div>{/* <ul>{renderItems()}</ul> */}</div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  videos: state.videoList,
  getVideosError: state.getVideosError,
  getVideosStart: state.getVideosStart,
});

export default connect(mapStateToProps, { getVideos })(withRouter(Search));
