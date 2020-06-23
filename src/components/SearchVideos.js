import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory, Link } from "react-router-dom";
import { getVidSearch } from "../store/actions";
import Fuse from "fuse.js";
import VideoList from "./VideoList";
import Video from "./Video";

function Search(props) {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    props.getVidSearch();
  }, []);

  useEffect(() => {
    if (props.videos && props.videos.length > 0) {
      setResults(fuse.search(query));
      console.log(props.videos);
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
                  <p>
                    <li>
                      <Link
                        to={`/videos/${result.item.id}`}
                        key={result.item.id}
                      >
                        {result.item.video_title}
                      </Link>
                    </li>
                  </p>
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
    threshold: 0.6,
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
  videos: state.videoSearch,
  getVidSearchError: state.getVidSearchError,
  getVidSearchStart: state.getVidSearchStart,
});

export default connect(mapStateToProps, { getVidSearch })(withRouter(Search));
