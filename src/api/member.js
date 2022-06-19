import axios from "axios";

const member = axios.create({
  baseURL: "https://ideal-server.herokuapp.com/api",
});

export default member;
