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
        localStorage.setItem("username", res.data.signIn.username);
        setTimeout(() => {
          dispatch({ type: LOGIN_SUCCESS });
          history.push(`/users/${res.data.signIn.username}`);
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
        localStorage.setItem("user_id", res.data.reg.id);
        localStorage.setItem("username", res.data.reg.username);
        history.push(`/users/${res.data.reg.username}`);
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
    .get(`/videos/random9`)
    .then((res) => {
      dispatch({ type: GET_VIDEOS_SUCCESS, payload: res.data });
      console.log("line60_+ACTIONS--GET_VIDEO_SUCCESS", res.data);
    })
    .catch((err) => {
      dispatch({ type: GET_VIDEOS_ERROR });
      console.log(err);
    });
};

export const GET_FINDVID_START = "GET_FINDVID_START";
export const GET_FINDVID_SUCCESS = "GET_FINDVID_SUCCESS";
export const GET_FINDVID_ERROR = "GET_FINDVID_ERROR";

export const getVidSearch = (token) => (dispatch) => {
  dispatch({ type: GET_FINDVID_START });
  axiosWithAuth(token)
    .get(`/videos`)
    .then((res) => {
      dispatch({ type: GET_FINDVID_SUCCESS, payload: res.data });
      console.log("Search videos working", res.data);
    })
    .catch((err) => {
      dispatch({ type: GET_FINDVID_ERROR });
      console.log("Search videos error", err);
    });
};

export const GET_USER_VIDEOS_START = "GET_USER_VIDEOS_START";
export const GET_USER_VIDEOS_SUCCESS = "GET_USER_VIDEOS_SUCCESS";
export const GET_USER_VIDEOS_ERROR = "GET_USER_VIDEOS_ERROR";

export const getUserVideos = (token, username) => (dispatch) => {
  dispatch({ type: GET_USER_VIDEOS_START });
  axiosWithAuth()
    .get(`/users/username/${username}`)
    .then((res) => {
      //console.log(res.data[0].id);
      axiosWithAuth()
        .get(`/videos/user/${res.data[0].id}`)
        .then((res) => {
          dispatch({ type: GET_USER_VIDEOS_SUCCESS, payload: res.data });

          //setVideos(res.data);
        })
        .catch((err) => {
          dispatch({ type: GET_USER_VIDEOS_ERROR, payload: err });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GET_SINGLE_VIDEO_START = "GET_SINGLE_VIDEO_START";
export const GET_SINGLE_VIDEO_SUCCESS = "GET_SINGLE_VIDEO_SUCCESS";
export const GET_SINGLE_VIDEO_ERROR = "GET_SINGLE_VIDEO_ERROR";

export const getSingleVideo = (token, videoId) => (dispatch) => {
  dispatch({ type: GET_SINGLE_VIDEO_START });
  axiosWithAuth(token)
    .get(`/videos/${videoId}`)
    .then((res) => {
      setTimeout(() => {
        dispatch({ type: GET_SINGLE_VIDEO_SUCCESS, payload: res.data });
      }, 1000);
    })
    .catch((err) => {
      dispatch({ type: GET_SINGLE_VIDEO_ERROR });
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
          payload: res.data,
        });
        history.push(`/videos/${res.data.videoId}`);
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
  localStorage.removeItem("username");
  history.push("/login");
};
