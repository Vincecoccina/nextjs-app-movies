import axios from "axios";
import { useQuery } from "react-query";

export const useSearch = (searchTerm: string) => {
    return useQuery("search", async() => {
        const {data} = await axios.get(`/api/search?search=${searchTerm}`)
        return data;
    })
}