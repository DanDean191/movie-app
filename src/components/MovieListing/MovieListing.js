import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllMovies } from '../../features/movies/moviesSlice'
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss'

const MovieListing = () => {
  const movieData = useSelector(selectAllMovies)
  const movies = Object.values(movieData)

  const renderMovies = movies.length > 0 
    ? (movies.map((movie,index) => <MovieCard key={index} data={movie} />)) 
    : (<div className="movies-error"><h3>{movies.Error}</h3></div>)

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
      <div className="movie-container">
        {renderMovies}
      </div>
      </div>
    </div>
  )
}

export default MovieListing