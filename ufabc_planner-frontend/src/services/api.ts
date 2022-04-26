import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", //todo DOT ENV
});

api.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      ...config.headers,
      common: {
        'Authorization': `Basic ${localStorage.getItem('auth_token')}`,
      }
    }
  })
);


export default api;
