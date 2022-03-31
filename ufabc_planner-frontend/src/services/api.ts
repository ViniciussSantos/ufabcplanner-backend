import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", //todo DOT ENV
});

export default api;
