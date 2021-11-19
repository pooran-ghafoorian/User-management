import axios from "axios-typescript";

export const http = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    if (typeof response.data === "string")
      response.data = JSON.parse(response.data);
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);
