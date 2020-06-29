import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App", () => {
  test("render without crashing", () => {
    shallow(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
