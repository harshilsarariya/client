import axios from "axios";

const member = axios.create({
  // baseURL: "https://ideal-server.herokuapp.com/api",
  baseURL: "http://localhost:5000/api",
});

export default member;
