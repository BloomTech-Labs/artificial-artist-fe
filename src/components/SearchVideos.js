import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory, Link } from "react-router-dom";
import { getVidSearch } from "../store/actions";
import Fuse from "fuse.js";
import VideoList from "./VideoList";
import SecondaryNav from "./SecondaryNav";
import Video from "./Video";
import style from "styled-components";

const Header = style.h1`
  width: 100%;
  text-align: center;
  font-size: 46px;
  margin-bottom: 20px;
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.50px; 
`;

const SearchInput = style.input`
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

const List = style.ul`
  list-style-type: none;
`;

const ListItem = style.li`

`;

const Container = style.div`
  margin: 0 auto;
  width: 60%;
  padding: 20px 0 60px;
`;

const Result = style.h1`
  margin-top: 60px;
  font-family: "Gibson Bold";
  padding-bottom: 40px;
  text-align: center;
  -webkit-text-fill-color: #7DFA9B;
  -webkit-text-stroke-color: #44E0F6;
  -webkit-text-stroke-width: 1.00px;
  color: #7DFA9B;
  font-size: 30px;
`;

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
                  <ListItem key={result.item.id}>
                    <Link to={`/videos/${result.item.id}`}>
                      <Result>{result.item.video_title}</Result>
                    </Link>
                  </ListItem>
                );
              })
            ) : (
              <Result>No matching videos found</Result>
            )}
          </>
        ) : (
          <Result>We're waiting...</Result>
        )}
      </>
    );
  };

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.3,
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
      <Container>
        <SecondaryNav />
        <Header>Video Search</Header>
        <form className="video_search">
          <SearchInput
            id="video"
            name="video"
            type="text"
            value={query}
            placeholder="Search Video, Artist or Song Name"
            onChange={handleSearch}
          />
        </form>
        <div>
          <List>{renderItems()}</List>
        </div>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => ({
  videos: state.videoSearch,
  getVidSearchError: state.getVidSearchError,
  getVidSearchStart: state.getVidSearchStart,
});

export default connect(mapStateToProps, { getVidSearch })(withRouter(Search));
