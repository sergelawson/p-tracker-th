import axios from "axios";
import { UserType } from "../components/UserContext";

type RequestHandler = {
  url: string;
};

function createRequestHandler({ url }: RequestHandler) {
  const local = localStorage.getItem("user");

  const { accesToken, refreshToken, ...user } = local
    ? (JSON.parse(local) as UserType)
    : { accesToken: null, refreshToken: null };

  const axiosInstance = axios.create({
    baseURL: url,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accesToken) {
        config.headers.Authorization = `Bearer ${accesToken}`;
      }
      if (refreshToken) {
        config.headers["x-refresh"] = refreshToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      const newAccessToken = response.headers["x-access-token"];

      if (newAccessToken) {
        const newUser = {
          accessToken: newAccessToken,
          refreshToken: refreshToken,
          ...user,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
      }

      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default createRequestHandler;
