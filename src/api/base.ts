import { notification } from "antd";
import axiosIns from "axios";
import { ErrorHandler } from "./error-handler";

export const axios = axiosIns.create({
  baseURL: "http://localhost:9396/",
  timeout: 2000,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    ErrorHandler(error.response.status);
  }
);
