import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { getToken } from "../utils/token";
import { showToast } from "../utils/showToast";

// import { nanoid } from "@reduxjs/toolkit";

// import { store } from "../../redux/store";
// import { addToast, removeToast } from "../../redux/toasts/toastsSlice";
// import { responseType } from "./responseType";

const SERVER_BASE_URL = "http://www.xiong35.cn";

/**
 * 失败会返回200以外的http状态码
 */
type HttpRes<T> = {
  success: boolean;
  /**
   * 错误提示信息, 出现错误时直接使用即可
   */
  message: string;
  error?: string;
  data: T;
};

const DEFAULT_ERR_MSG = "出错了！";

export default function _request<T = {}>(config: AxiosRequestConfig) {
  // const { addToastFn } = useAddToast();

  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 60000,
    // withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers = config.headers || {};
      config.headers.Authorization = "Bearer " + (token?.value ?? "");
      return config;
    },
    (err) => {
      console.error(err);
    }
  );

  return new Promise<T | null>((resolve) => {
    instance
      .request<HttpRes<T>>(config)
      .then((res) => {
        if (res.status === 200 && res.data && res.data.success) {
          resolve(res.data.data);
        } else if (!res.data) {
          throw DEFAULT_ERR_MSG;
        } else {
          console.log(res.data);
          throw res.data.message || DEFAULT_ERR_MSG;
        }
      })
      .catch((err) => {
        console.error("in request: ", { config, err });

        let errMsg = DEFAULT_ERR_MSG;
        if (typeof err === "string") {
          errMsg = err;
        } else if ((err as AxiosError).isAxiosError) {
          const axiosErr = err as AxiosError<HttpRes<T>>;
          if (axiosErr.response) {
            errMsg = axiosErr.response.data.message;
          }
        } else if (err instanceof Error) {
          errMsg = err.message;
        }

        console.log({ errMsg });
        showToast(errMsg, "error");

        resolve(null);
      });
  });
}
