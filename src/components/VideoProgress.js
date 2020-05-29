import React, { useState, useEffect } from "react";
import SingleVideoPage from "./SingleVideoPage";
import Loading from "./Loading";

export default function VideoProgress() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <Loading setIsLoading={setIsLoading} />
      ) : (
        <SingleVideoPage />
      )}
    </div>
  );
}
