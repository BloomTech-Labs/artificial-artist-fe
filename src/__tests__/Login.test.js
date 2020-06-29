import React from "react";
import { renderWithReduxAndRouter as render } from "../utils/renderWithReduxAndRouter.js";
import { BrowserRouter as Router } from "react-router-dom";
import {
  fireEvent,
  wait,
  getAllByText,
  getAllByAltText,
} from "@testing-library/react";
import Login from "../components/Login";
import axios from "axios";
import { Provider } from "react-redux";

describe("Login", () => {
  it("shows login form", () => {
    render(<Login />);
  });

  it("renders login fields", () => {
    const { getByText } = render(<Login />);

    getByText(/email/i);
    getByText(/Password/i);
  });

  //mock up
  let mock;
  beforeEach(() => {
    mock = jest.spyOn(axios, "post");
  });
  afterEach(() => {
    mock.mockRestore();
  });

  const { getByPlaceholderText, getByText, getByTestId } = render(<Login />);

  const fakeForm = (email, password) => {
    fireEvent.change(getByPlaceholderText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: password },
    });
  };

  it.skip("login with faux data", async () => {
    render(<Login />);
    fakeForm("fake@email.com", "tester123");
    const testUser = {
      email: getByPlaceholderText("email").value,
      password: getByPlaceholderText("password").value,
    };
    const result = { data: { user: testUser, token: "12345" } };
    mock.mockResolvedValue(result);
    fireEvent.submit(getByTestId("submit"));
    await wait(() =>
      expect(mock).toHaveBeenCalledWith("/auth/login", testUser)
    );
  });
});
