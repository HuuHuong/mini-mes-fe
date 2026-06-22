import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { describeErrorResponse, describeSuccessResponse } from "./logger";

// Define custom API Error format
export interface ApiError {
  status?: number;
  message: string;
  data?: any;
}

// Read Base URL from environment variables or use local ASP.NET Core URL as a fallback
const BASE_URL = "http://localhost:5130/v1";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Attach bearer token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    (config as any).startTime = Date.now();
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject({
      message: error.message || "Request configuration error",
    } as ApiError);
  },
);

// Response Interceptor: Uniform error format and global event dispatch (like Auth Expired)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Automatically unwrap successful wrapped response format: { data, status, limit, offset }
    if (
      response.data &&
      typeof response.data === "object" &&
      "status" in response.data &&
      "data" in response.data
    ) {
      describeSuccessResponse(response);
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    const apiError: ApiError = {
      status: error.response?.status,
      message: "An unexpected error occurred",
      data: error.response?.data,
    };

    if (error.response) {
      // Check if server returned a wrapped failed response: { data: { message, errors }, status }
      describeErrorResponse(error);
      const errData = error.response.data;
      if (
        errData &&
        typeof errData === "object" &&
        "status" in errData &&
        "data" in errData
      ) {
        const errorDetail = errData.data; // { message, errors }
        apiError.message =
          errorDetail.message || "An unexpected error occurred";
        apiError.data = errorDetail;
      } else {
        // Fallback for standard/traditional formats
        const serverMessage =
          error.response.data?.message || error.response.data?.title;
        apiError.message =
          serverMessage ||
          `Error ${error.response.status}: ${error.response.statusText}`;
      }

      // Global handler for Auth Expired (401)
      if (error.response.data.code === 401) {
        localStorage.removeItem("token");
        // Dispatch custom event for 401 unauthorized to notify redux listener or application
        const unauthorizedEvent = new CustomEvent("api:unauthorized");
        window.dispatchEvent(unauthorizedEvent);
      }
    } else if (error.request) {
      // Request was made but no response was received
      apiError.message =
        "No response received from server. Please check your network connection.";
    } else {
      // Something else caused the error
      apiError.message = error.message;
    }

    console.error("[API Error Interceptor]:", apiError);
    return Promise.reject(apiError);
  },
);
