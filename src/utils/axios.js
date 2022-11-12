import axios from "axios";
import Cache from "axios-request-cache";

let instance = axios.create({
  baseURL: "",
});

let cache = new Cache(axios);
cache.use({
  expire: 30000,
  storage: true,
  instance,
});

export default instance;
