import axios from "axios";

// an instance of the Axios driver. Used everywhere for API calls
const instance = axios.create({
  baseURL: "http://localhost:3003/api",
  headers: {
    "Content-Type": "application/json",
  }
});

export default instance;