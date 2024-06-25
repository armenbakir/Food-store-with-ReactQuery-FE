import { Food } from "@types";
import axios from "axios";

interface FoodFormData {
  id?: string;
  name: string;
  categoryId: string;
  numberInStock: number;
  price: number;
}

const API_BASEURL = "https://server.intensivecode.se/api/foods";
const CREDENTIALS = "?username=armen&accessCode=gdhHaS";

function foodURL(id?: string) {
  if (id) return `${API_BASEURL}/${id}${CREDENTIALS}`;

  return API_BASEURL + CREDENTIALS;
}

export function getFoods() {
  return axios.get<Food[]>(foodURL());
}

export function getFood(id: string) {
  return axios.get<Food>(foodURL(id));
}

export function saveFood(food: FoodFormData) {
  if (food.id) return axios.put<Food>(foodURL(food.id), food);

  return axios.post<Food>(foodURL(), food);
}

export function deleteFood(id: string) {
  return axios.delete<Food>(foodURL(id));
}
