import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_VIDEOS_START,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_ERROR,
  //POST_VIDEO_START,
  //POST_VIDEO_SUCCESS,
  //POST_VIDEO_FAILURE,
  LOGOUT,
} from "../actions";

const initialState = {
  username: "",
  password: "",
  loginStart: false,
  loginSuccess: false,
  loginError: false,
  signupStart: false,
  signupNew: false,
  signupError: false,
  getVideosStart: false,
  getVideosSuccess: false,
  getVideosError: false,
  //postVideoStart: false,
  //postVideoSuccess: false,
  //postVideoError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginStart: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStart: false,
        loginSuccess: true,
        signupNew: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loginStart: false,
        loginError: true,
      };

    case SIGNUP_START:
      return {
        ...state,
        signupStart: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupStart: false,
        signupNew: true,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        signupStart: false,
        signupError: true,
      };

    case GET_VIDEOS_START:
      return {
        ...state,
        getVideosStart: true,
      };

    case GET_VIDEOS_SUCCESS:
     let ap=action.payload;
      console.log("reducer--GET_VIDEOS_SUCCESS case",{ap},"ap.videos",ap.videos);
      return {
        ...state,
        getVideosStart: false,
        getVideosError: false,
        videoList: action.payload.videos,
      };

    case GET_VIDEOS_ERROR:
      return {
        ...state,
        getVideosStart: false,
        getVideosError: true,
      };

    /*case POST_VIDEO_START:
      return {
        ...state,
        postVideoStart: true,
      };

    case POST_VIDEO_SUCCESS:
      console.log('action.payload in reducers', action.payload)
      return {
        ...state,
        videos: [...state.videos, action.payload],
        postVideoStart: false,
      };

    case POST_VIDEO_FAILURE:
      return {
        ...state,
        postVideoStart: false,
        postVideoError: true,
      };*/

    case LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;