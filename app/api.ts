/**
 * Axios instance configuration for API requests
 * Base URL points to local development server
 * Timeout set to 5 seconds for all requests
 */
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.102:8000/api",
  timeout: 5000,
});
