import api from "@/api/interceptors";
export const getMovies = async () => {
  const response = await api.get("/movies");
  return response.data;
};

export const createMovie = async (payload: any) => {
  const response = await api.post("/movies", payload);
  return response.data;
};
