import { User } from "@types";
import axios from "axios";

const API_ENDPOINT =
  "https://server.intensivecode.se/api/users?username=armen&accessCode=gdhHaS";

function register(user: User) {
  return axios.post(API_ENDPOINT, user);
}

export default { register };
