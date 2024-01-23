import { useQuery } from "react-query";
import axios from "axios";


export const useSuggest = (slug : string | null = null) => {
  return useQuery("movies", async () => {
    const { data } = await axios.get(`/api/movies/${slug}/suggest`);
    return data;
  });
};