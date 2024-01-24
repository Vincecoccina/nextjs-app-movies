import { useQuery } from "react-query";
import axios from "axios";


export const useMovies = (slug : string | null = null, limit: number | string = 'all', visibility: number | string = 0) => {
  return useQuery("movies", async () => {
    const { data } = await axios.get(`/api/movies?cat=${slug}&limit=${limit}&visibility=${visibility}`);
    return data;
  });
};
