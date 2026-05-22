import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/moviesApi";
export const useMovies = () => {
    return useQuery({queryKey: ['movies'], queryFn: getMovies})
}