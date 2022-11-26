import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_SUCCESS,
  DELETE_FAIL,
  REFRESH_TOKEN,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// This reducer will update the isLoggedIn and user state of the application
 const auth = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case DELETE_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        user: { ...user, accessToken: payload },
      };
    default:
      return state;
  }
}
export default auth