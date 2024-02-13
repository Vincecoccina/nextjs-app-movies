import { useQuery } from "react-query";
import axios from "axios";


export const useMovies = (slug : string | null = null, limit: number | string = 'all', visibility: number | string = "", page: number) => {
  return useQuery("movies", async () => {
    const { data } = await axios.get(`/api/movies?cat=${slug}&limit=${limit}&visibility=${visibility}&page=${page}`);
    const { movies, count } = data;
    return { movies, count };
  });
};
