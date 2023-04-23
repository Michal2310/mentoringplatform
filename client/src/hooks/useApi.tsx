import { useContext } from "react";
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import { AuthContext } from "../context/authContext";

type ApiMethod = "get" | "post" | "put" | "delete" | "patch";

interface Typehead {
  Authorization?: string;
  "Content-Type"?: string;
}

type FetchFunction<T> = (
  url: string,
  method: ApiMethod,
  isAuth: boolean,
  config?: AxiosRequestConfig,
) => Promise<T>;
const useApi = <T,>(): FetchFunction<T> => {
  const { token } = useContext(AuthContext);
  const fetchApi = async (
    url: string,
    method: ApiMethod,
    isAuth: boolean,
    config?: AxiosRequestConfig,
  ) => {
    try {
      const response = await axios({
        url,
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token.access_token}`,
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new AxiosError("Request failed", error.response?.data);
      } else {
        throw error;
      }
    }
  };
  return fetchApi;
};

export default useApi;
