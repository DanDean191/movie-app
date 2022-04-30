import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllMovies, selectLoadingState } from '../../features/movies/moviesSlice'
import MovieCard from '../MovieCard/MovieCard'
import Loading from '../Loading/Loading'
import './MovieListing.scss'

const MovieListing = () => {
  const movieData = useSelector(selectAllMovies)
  const loading = useSelector(selectLoadingState)
  const movies = Object.values(movieData)

  const renderMovies = movies.length > 0 
    ? (movies.map((movie,index) => <MovieCard key={index} data={movie} />)) 
    : (<div className="movies-error"><h3>{movies.Error}</h3></div>)

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
      {!movies.length > 0 && loading && <Loading />}
      {!movies.length > 0 && !loading && <h1>No Results Found</h1>}
      <div className="movie-container">
        {renderMovies}
      </div>
      </div>
    </div>
  )
}

export default MovieListing