import http from "./http";

export const getSongs = () => http.get("/songs");
export const addSong = (song) => http.post("/songs", song);
export const updateSong = (id, song) => http.put(`/songs/${id}`, song);
export const deleteSong = (id) => http.delete(`/songs/${id}`);
