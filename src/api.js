import axios from "axios";

// an instance of the Axios driver. Used everywhere for API calls
// http://35.209.74.28:4000/api
const instance = axios.create({
  baseURL: "http://35.209.74.28:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;