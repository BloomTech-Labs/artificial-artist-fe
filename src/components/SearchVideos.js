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

  // const videos = [
  //     {
  //       id: 1,
  //       video_title: "Today was A good Day for Lo Mein",
  //       location: "https://artificial-artist.s3.amazonaws.com/cube.mp4",
  //       video_created: true,
  //       song_id: 1,
  //       title: "Push Every Button",
  //       artist_name: "Mayhem",
  //     },
  //     {
  //       id: 2,
  //       video_title: "Cali Loves Mashed Potatoes",
  //       location: "https://artificial-artist.s3.amazonaws.com/CAlove.mp4",
  //       video_created: true,
  //       song_id: 2,
  //       title: "Endeavours",
  //       artist_name: "Mitis",
  //     },
  //     {
  //       id: 3,
  //       video_title: "Today Was A Good Day For Quail",
  //       location: "https://artificial-artist.s3.amazonaws.com/None.mp4",
  //       video_created: true,
  //       song_id: 3,
  //       title: "See Me In A Crown",
  //       artist_name: "Billie Eilish",
  //     },
  //     {
  //       id: 4,
  //       video_title: "Blooming Accordians",
  //       location: "https://artificial-artist.s3.amazonaws.com/26.mp4",
  //       video_created: true,
  //       song_id: 4,
  //       title: "ilomilo",
  //       artist_name: "Billie Eilish",
  //     },
  //     {
  //       id: 5,
  //       video_title: "Basketball Symphony",
  //       location: "https://artificial-artist.s3.amazonaws.com/bo1.mp4",
  //       video_created: true,
  //       song_id: 5,
  //       title: "Future Bass",
  //       artist_name: "Runsblov",
  //     },
  //     {
  //       id: 6,
  //       video_title: "The Dont Stop Believing Bus",
  //       location: "https://artificial-artist.s3.amazonaws.com/bri3.mp4",
  //       video_created: true,
  //       song_id: 6,
  //       title: "Action Dubstep",
  //       artist_name: "Lazaoaza",
  //     },
  //     {
  //       id: 7,
  //       video_title: "Tuxedos Floating on a River",
  //       location: "https://artificial-artist.s3.amazonaws.com/bri1.mp4",
  //       video_created: true,
  //       song_id: 7,
  //       title: "Funky Reggae Dubstep",
  //       artist_name: "Progressence",
  //     },
  //     {
  //       id: 8,
  //       video_title: "TarantulaCrisp",
  //       location: "https://artificial-artist.s3.amazonaws.com/TarantulaCrisp.mp4",
  //       video_created: true,
  //       song_id: 8,
  //       title: "Drunk in Love",
  //       artist_name: "Beyoncé",
  //     },
  //     {
  //       id: 9,
  //       video_title: "the way of the web",
  //       location: "https://artificial-artist.s3.amazonaws.com/3.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //     {
  //       id: 10,
  //       video_title: "the way of the web",
  //       location: "https://artificial-artist.s3.amazonaws.com/8.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //     {
  //       id: 11,
  //       video_title: "the way of the web",
  //       location: "https://artificial-artist.s3.amazonaws.com/10.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //     {
  //       id: 12,
  //       video_title: "the way of the web",
  //       location: "https://artificial-artist.s3.amazonaws.com/20.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //     {
  //       id: 13,
  //       video_title: "flowertopia",
  //       location: "https://artificial-artist.s3.amazonaws.com/26.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //     {
  //       id: 14,
  //       video_title: "dafting",
  //       location: "https://artificial-artist.s3.amazonaws.com/dafting.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //     {
  //       id: 15,
  //       video_title: "Collies on my mind",
  //       location: "https://artificial-artist.s3.amazonaws.com/bri2.mp4",
  //       video_created: true,
  //       song_id: 9,
  //       title: "Don't Stop Believin'",
  //       artist_name: "Journey",
  //     },
  //   ];

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
    getVideos();
  }, []);

  useEffect(() => {
    if (props.videos && props.videos.length > 0) {
      console.log(fuse.search(query));
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
          {props.videos && props.videos.map((video) => <h1>{video.title}</h1>)}
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
