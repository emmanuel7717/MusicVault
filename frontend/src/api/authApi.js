import http from "./http";

export const registerUser = (data) => http.post("/users/register", data);
export const loginUser = (data) => http.post("/users/login", data);
export const verifyOtp = (data) => http.post("/users/verify-login", data);
