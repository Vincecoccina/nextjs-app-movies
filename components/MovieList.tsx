import MovieCard from './MovieCard'
import React from 'react'
import { Movie } from '@/type'


type Props = {
    movies: Movie[]
}

export default function MovieList({movies} : Props) {
  return (
    <div className='gap-2 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {movies.map((movie :Movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
  )
}