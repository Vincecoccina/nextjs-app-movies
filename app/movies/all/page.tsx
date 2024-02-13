"use client";

import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { useMovies } from "@/hooks/useMovies";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MovieWithCategory } from "@/type";



const AllMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState();
  const [movies, setMovies] = useState<MovieWithCategory[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`/api/movies?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const { movies, count } = await response.json();
      setMovies((prevMovies) => {
        const updatedMovies = [...prevMovies];
  
        if (movies) {
          movies.forEach((newMovie: MovieWithCategory) => {
            const isMovieAlreadyInState = prevMovies.some(
              (prevMovie) => prevMovie.id === newMovie.id
            );
            if (!isMovieAlreadyInState) {
              updatedMovies.push(newMovie);
            }
          });
        }
  
        return updatedMovies;
      });
      setCurrentPage(currentPage + 1);
      setCount(count);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsFetching(false);
    }
  };
  

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !isFetching) {
      fetchMovies();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);
 

  return (
    <PageContainer>
      <main className="py-10 px-4">
        <section>
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-[22px] font-bold text-black dark:text-gray-100 capitalize italic">
              Le catalogue Uncut vidéo
            </h1>
      
              <Badge className="text-white text-[14px] font-bold bg-cyan-600">
                {count}
              </Badge>
          
          </div>
          <MovieList movies={movies} />
        </section>
      </main>
    </PageContainer>
  );
};

export default AllMovies;
