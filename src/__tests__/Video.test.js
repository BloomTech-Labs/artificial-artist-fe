import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Video from "../components/Video";

describe("VideoPlayer", () => {
  const video = {
    video_title: "test",
    location: "test",
    thumbnail: "test.png",
    video_status: "successful",
    user_id: 1,
    song_id: 1,
  };

  test("VideoPlayer renders", () => {
    shallow(<Video video={video} />);
  });

  test("should have video player element", () => {
    const wrapper = shallow(<Video video={video} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
