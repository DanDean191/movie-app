import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMovie, selectLoadingState, getMovie, clearMovie } from '../../features/movies/moviesSlice'
import './MovieDetail.scss'

const MovieDetail = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoadingState)
  const data = useSelector(selectCurrentMovie)
  const { id } = useParams();
  const {title, budget, overview, release_date, revenue, runtime, tagline, poster_path, vote_average} = data

  useEffect(() => {
    dispatch(getMovie(id))
  },[id, dispatch])
    
  return (
    <>
    { 
    loading ? <div>loading</div> :
    
    
    <div className="movie-details-container">
      <div className="movie-details">
      <h1>{title} - {release_date && release_date.slice(0,4)}</h1>
      <h3>{tagline}</h3>
      
        <p>Runtime: {runtime} mins</p>
        <p>Budget: ${budget}</p>
        <p>Revenue: ${revenue}</p>
        <p>{overview}</p>
        <p>User rating: <span>{vote_average*10}%</span></p>
        <div className="meter-outer">
          <div className="meter-inner" style={{width: `${vote_average*10}%`}}>
          </div>
        </div>

      </div>
          
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title + 'Poster'}></img>
      </div>
    </div>
    
    }
    </>
  )
}

export default MovieDetail