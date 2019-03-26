import axios from "axios";
import NProgress from "nprogress";

const API_BASE_URL = "https://api.github.com";
const NUMBER_OF_PROFILES_TO_DISPLAY = 100;
const API_TOKEN = "fdd83349eaddc6a102419f86dca3743fd1a542d7";

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

export function getPopularUsersByLanguage(language) {
  const params = {
    q: `language:${language}`,
    per_page: NUMBER_OF_PROFILES_TO_DISPLAY,
    access_token: API_TOKEN,
    sort: "followers",
    order: "desc"
  };

  return apiClient.get("/search/users", { params });
}

export default {
  getPopularUsersByLanguage
};
