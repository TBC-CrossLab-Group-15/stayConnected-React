import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://stayconnected.lol/api/",
  timeout: 10000,
});

export default httpClient;
