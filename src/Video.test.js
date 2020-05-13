import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Video from "../components/Video";

describe("VideoPlayer", () => {
  test("VideoPlayer renders", () => {
    const VideoPlayer = render(<Video />);
    expect(VideoPlayer).toMatchSnapshot();
  });
  test("renders the 3rd party videoPlayer", () => {
    const { findByText } = render(<Video />);
    expect(findByText(/Player/i));
  });
  test("VideoPlayer renders video from props", () => {
    let mockVideoLink = "www.mOcK_GAN_vIdEo_StReAm.com";
    const VideoPlayerWithVideoProp = render(
      <Video videoStream={mockVideoLink} />
    );

    const mockVideoURL = VideoPlayerWithVideoProp.findByText(
      /www\.mock_GAN_video_stream\.com/i
    );
    expect(mockVideoURL).toBeTruthy();
  });
});
