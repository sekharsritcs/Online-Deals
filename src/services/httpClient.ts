import axios, { type AxiosInstance } from "axios";
import { API_CONFIG } from "../config/api.config";

/**
 * HTTP Client instance configured with API settings
 */
const httpClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    ...API_CONFIG.headers,
    "x-api-key": API_CONFIG.apiKey,
  },
});

export default httpClient;