import { axiosWithAuth } from "../../utils/axiosWithAuth";

const urlServer = "http://localhost:5000/api";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (creds, history) => (dispatch) => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post(`${urlServer}/auth/login`, creds)
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        setTimeout(() => {
          dispatch({ type: LOGIN_SUCCESS });
          history.push("/videos");
        }, 1000);
      }, 1000);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERROR });
      console.log(err);
    });
};

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (creds, history) => (dispatch) => {
  dispatch({ type: SIGNUP_START });

  axiosWithAuth()
    .post(`${urlServer}/auth/register`, creds)
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        localStorage.setItem("token", res.data.token);
        history.push("/videos");
      }, 1000);
    })
    .catch((err) => dispatch({ type: SIGNUP_ERROR }));
};

export const GET_VIDEOS_START = "GET_VIDEOS_START";
export const GET_VIDEOS_SUCCESS = "GET_VIDEOS_SUCCESS";
export const GET_VIDEOS_ERROR = "GET_VIDEOS_ERROR";

export const getVideos = (token) => (dispatch) => {
  dispatch({ type: GET_VIDEOS_START });
  axiosWithAuth(token)
    .get(`${urlServer}/videos`)
    .then((res) => {
      console.log(res.data);
      setTimeout(() => {
        dispatch({ type: GET_VIDEOS_SUCCESS, payload: res.data });
      }, 1000);
    })
    .catch((err) => {
      dispatch({ type: GET_VIDEOS_ERROR });
      console.log(err);
    });
};

export const LOGOUT = "LOGOUT";

export const logout = (history) => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  history.push("/login");
};