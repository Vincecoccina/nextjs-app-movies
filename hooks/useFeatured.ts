import { useQuery } from "react-query";
import axios from "axios";

export const useFeatured = () => {
    return useQuery("featured", async () => {
      const { data } = await axios.get("/api/movies/featured");
      return data;
    });
  };