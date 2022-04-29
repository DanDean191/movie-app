import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularMovies, selectSearchTerm, searchAsyncMovies, clearMovie } from '../../features/movies/moviesSlice'

const Home = () => {
  const dispatch = useDispatch()  
  const searchTerm = useSelector(selectSearchTerm)

  useEffect(() => {
    dispatch(getPopularMovies())
    dispatch(clearMovie())
  }, [dispatch])

  useEffect(() => {
    if (searchTerm !== '') dispatch(searchAsyncMovies(searchTerm))
  }, [searchTerm])

  return (
    <>
      <MovieListing />
    </>
  )
}

export default Home