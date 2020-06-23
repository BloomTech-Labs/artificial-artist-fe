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
  GET_FINDVID_START,
  GET_FINDVID_SUCCESS,
  GET_FINDVID_ERROR,
  GET_USER_VIDEOS_START,
  GET_USER_VIDEOS_SUCCESS,
  GET_USER_VIDEOS_ERROR,
  GET_SINGLE_VIDEO_START,
  GET_SINGLE_VIDEO_SUCCESS,
  GET_SINGLE_VIDEO_ERROR,
  POST_VIDEO_START,
  POST_VIDEO_SUCCESS,
  POST_VIDEO_ERROR,
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
  getVidSearchStart: false,
  getVidSearchSuccess: false,
  getVidSearchError: false,
  getUserVideosStart: false,
  getUserVideosSuccess: false,
  getUserVideosError: false,
  userVideos: [],
  getSingleVideoStart: false,
  getSingleVideoSuccess: false,
  getSingleVideoError: false,
  singleVideo: "initializing",
  postVideoStart: false,
  postVideoSuccess: false,
  postVideoError: false,
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
      let ap = action.payload;
      console.log(
        "reducer--GET_VIDEOS_SUCCESS case",
        { ap },
        "ap.videos",
        ap.videos
      );
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

    case GET_FINDVID_START:
      return {
        ...state,
        getVidSearchStart: true,
      };

    case GET_FINDVID_SUCCESS:
      return {
        ...state,
        getVidSearchStart: false,
        getVidSearchError: false,
        videoSearch: action.payload.videos,
      };

    case GET_FINDVID_ERROR:
      return {
        ...state,
        getVidSearchStart: false,
        getVidSearchError: true,
      };

    case GET_USER_VIDEOS_START:
      return {
        ...state,
        getUserVideosStart: true,
      };

    case GET_USER_VIDEOS_SUCCESS:
      return {
        ...state,
        getUserVideosStart: false,
        getUserVideosError: false,
        userVideos: action.payload,
      };

    case GET_USER_VIDEOS_ERROR:
      return {
        ...state,
        getUserVideosStart: false,
        getUserVideosError: true,
      };

    case GET_SINGLE_VIDEO_START:
      return {
        ...state,
        getSingleVideoStart: true,
      };

    case GET_SINGLE_VIDEO_SUCCESS:
      return {
        ...state,
        getSingleVideoStart: false,
        getSingleVideoError: false,
        singleVideo: action.payload,
      };

    case GET_SINGLE_VIDEO_ERROR:
      return {
        ...state,
        getSingleVideoStart: false,
        getSingleVideoError: true,
      };

    case POST_VIDEO_START:
      return {
        ...state,
        postVideoStart: true,
      };

    case POST_VIDEO_SUCCESS:
      console.log("action.payload in reducers", action.payload);
      return {
        // ...state,
        // videos: [...state.videos, action.payload],
        postVideoStart: false,
        singleVideo: action.payload,
      };

    case POST_VIDEO_ERROR:
      return {
        ...state,
        postVideoStart: false,
        postVideoError: true,
      };

    case LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
