import { useQuery } from "react-query";
import axios from "axios";


export const useMovies = (slug : string | null = null) => {
  return useQuery("movies", async () => {
    const { data } = await axios.get(`/api/movies?cat=${slug}`);
    return data;
  });
};
