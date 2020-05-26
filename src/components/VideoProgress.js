import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import SingleVideoPage from "./SingleVideoPage";
import Loading from "./Loading";

function VideoProgress({ isLoading, location }) {
  useEffect(() => {
    if (isLoading && location === 0) {
      return <Loading />;
    }
    if ((location = "url")) {
      return <SingleVideoPage />;
    }
  }, [location, isLoading]);
}

const mapStateToProps = (state) => ({
  isLoading: state.postVideo.isLoading,
  location: state.postVideo.location,
});

export default connect(mapStateToProps, null)(VideoProgress);
