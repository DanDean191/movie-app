import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularMovies, getSearchTerm, searchAsyncMovies } from '../../features/movies/moviesSlice'

const Home = () => {
  const dispatch = useDispatch()  
  const searchTerm = useSelector(getSearchTerm)

  useEffect(() => {
    dispatch(getPopularMovies())
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