import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Fuse from "fuse.js";
import VideoList from "./VideoList";
import Video from "./Video";

function Search(props) {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    props.getVideos();
  }, []);

  useEffect(() => {
    if (props.videos && props.videos.length > 0) {
      setResults(fuse.search(query));
    }
  }, [query]);

  const renderItems = () => {
    return (
      <>
        {query.length > 2 ? (
          <>
            {results.length > 0 ? (
              results.map((result) => {
                return (
                  <li key={result.item.id}>
                    <Link to={`/videos/${result.item.id}`}>
                      {result.item.title}
                    </Link>
                  </li>
                );
              })
            ) : (
              <div>No matching videos found</div>
            )}
          </>
        ) : (
          <VideoList />
        )}
      </>
    );
  };

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    keys: ["title", "video_title", "artist_name"],
  };

  const fuse = new Fuse(props.videos, fuseOptions);

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
          <ul>{renderItems()}</ul>
        </div>
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
