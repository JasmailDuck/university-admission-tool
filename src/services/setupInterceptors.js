import axiosInstance from "../api";
import TokenService from "./token_service";
import config from "../config";
import { refreshToken } from "../actions/auth";

// dispatchs the Redux action for refresh token.
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;

  // Will get to eventually. this looks for a new access token from the refresh token
  // when a 403 error occurs (meaning the user is not authorized to make that API call)

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;

          // will dispatch the Refresh token, then update a new one when expired
          try {
            const rs = await axiosInstance.get(config.uniAdminToolServer.refresh_access_token_location);

            const { accessToken } = rs.data;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;