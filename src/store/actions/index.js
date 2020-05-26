import { axiosWithAuth } from "../../utils/axiosWithAuth";

// const urlServer = process.env.REACT_APP_SERVER_URL;

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (creds, history) => (dispatch) => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post(`/auth/login`, creds)
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.signIn.id);
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
    .post(`/auth/register`, creds)
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.signIn.id);
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
    .get(`/videos`)
    .then((res) => {
      dispatch({ type: GET_VIDEOS_SUCCESS, payload: res.data });
      console.log("line60_+ACTIONS--GET_VIDEO_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({ type: GET_VIDEOS_ERROR });
      console.log(err);
    });
};

export const POST_VIDEO_START = "POST_VIDEO_START";
export const POST_VIDEO_SUCCESS = "POST_VIDEO_SUCCESS";
export const POST_VIDEO_ERROR = "POST_VIDEO_ERROR";

export const postVideo = (token, video, history) => (dispatch) => {
  dispatch({
    type: POST_VIDEO_START,
  });

  axiosWithAuth(token)
    .post(`/videos`, video)
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: POST_VIDEO_SUCCESS,
        });
        history.push(`/video/${res.data.videoId}`);
      }, 1000);
    })
    .catch((err) =>
      dispatch({
        type: POST_VIDEO_ERROR,
        err,
      })
    );
};

export const LOGOUT = "LOGOUT";

export const logout = (history) => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  history.push("/login");
};

export const GET_VIDID_START = "GET_VIDID_START";
export const GET_VIDID_SUCCESS = "GET_VIDID_SUCCESS";
export const GET_VIDID_ERROR = "GET_VIDID_ERROR";

export const getVidID = (videoId) => (dispatch) => {
  dispatch({ type: GET_VIDID_START });
  axiosWithAuth()
    .get(`/videos/${videoId}`)
    .then((res) => {
      dispatch({ type: GET_VIDID_SUCCESS, payload: res.data });
      console.log("line110_+ACTIONS--GET_VIDID_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({ type: GET_VIDID_ERROR });
      console.log(err);
    });
};
