import axios from "axios";

export const axiosService = axios.create({
  baseURL: "https://calendar-42d5c-default-rtdb.firebaseio.com/calendar",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
});
