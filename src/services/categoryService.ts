import { Category } from "@types";
import axios from "axios";

export function getCategories() {
  return axios.get<Category[]>("http://localhost:5570/api/categories");
}
