import React from "react";
import { renderWithReduxAndRouter as render } from "../utils/renderWithReduxAndRouter.js";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, wait, getByLabelText } from "@testing-library/react";
import Signup from "../components/Signup";
import axios from "axios";
import { Provider } from "react-redux";

describe("Register", () => {
  it("shows register form", () => {
    render(<Signup />);
  });

  it("renders form fields", () => {
    const { getByText } = render(<Signup />);
    getByText(/username/i);
    getByText(/first name/i);
    getByText(/last name/i);
    getByText(/email/i);
    getByText(/password/i);
  });

  let mock;
  beforeEach(() => {
    mock = jest.spyOn(axios, "post");
  });
  afterEach(() => {
    mock.mockRestore();
  });

  const { getByPlaceholderText, getByTestId } = render(<Signup />);

  const fakeForm = (username, first_name, last_name, email, password) => {
    fireEvent.change(getByPlaceholderText(/username/i), {
      target: { value: username },
    });
    fireEvent.change(getByPlaceholderText(/first_name/i), {
      target: { value: first_name },
    });
    fireEvent.change(getByPlaceholderText(/last_name/i), {
      target: { value: last_name },
    });
    fireEvent.change(getByPlaceholderText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: password },
    });
  };
  it.skip("registers with faux data", async () => {
    render(<Signup />);
    fakeForm("rickC137", "Rick", "Sanchez", "dontbjerry@fake.com", "password");
    const entry = {
      username: getByPlaceholderText("username").value,
      first_name: getByPlaceholderText("first_name").value,
      last_name: getByPlaceholderText("last_name").value,
      email: getByPlaceholderText("email").value,
      password: getByPlaceholderText("password").value,
    };
    const result = { data: { user: entry, token: "12345" } };

    mock.mockResolvedValue(result);
    fireEvent.submit(getByTestId("submit"));
    await wait(() =>
      expect(mock).toHaveBeenCalledWith("/auth/register", entry)
    );
  });
});
