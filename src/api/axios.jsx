import axios from "axios";
const BASE_URL =
  "http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/api/";
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true
});
