import axios from "axios";

const api = axios.create({
  baseURL: 'http://51.21.221.33/api/',
  withCredentials: true,
});

export default api;
