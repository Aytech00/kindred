/** @format */

import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import { getSession, signOut } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = (session as any)?.accessToken as string | undefined;

    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error?.response?.status === 401) {
//       await signOut({ callbackUrl: "/sign-in" });
//     }
//     return Promise.reject(error);
//   }
// );

const handleError = (error: any) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    throw new Error(
      error.response.data.message ||
        error.response.data.response_message ||
        "An error occurred"
    );
  } else if (error.request) {
    throw new Error("Network Error: No response received.");
  } else {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const apiClient = {
  instance: axiosInstance,

  async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, {
        params,
        ...config,
      });
      return response.data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  },

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  },

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch(
        url,
        data,
        config
      );
      return response.data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  },

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(
        url,
        data,
        config
      );
      return response.data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(
        url,
        config
      );
      return response.data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  },
};

export const { get, post, patch, put, delete: del } = apiClient;
