import axios from "axios";

//  Nginx가 /api를 Spring Boot로 프록시한다는 전제
const client = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default client;