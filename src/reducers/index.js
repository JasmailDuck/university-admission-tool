import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";


// Combines both reducers into a single reducing function that can be passed
// into the createStore function in the store.js file. 
// It will call both reducers when called.
export default combineReducers({
  auth,
  message,
});