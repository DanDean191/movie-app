import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentMovie, getMovie } from '../../features/movies/moviesSlice'
import './MovieDetail.scss'

const MovieDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMovie(id))
  },[])
    
  const data = useSelector(getCurrentMovie)

  //console.log(data)

  const {title, budget, overview, release_date, revenue, runtime, tagline, poster_path, vote_average} = data
  


  return (
    <div className="movie-details-container">
      <h1>{title} - {release_date}</h1>
      <h3>{tagline}</h3>
      <p>{runtime} mins</p>
      <p>Budget ${budget}</p>
      <p>Revenue ${revenue}</p>
      <p>{overview}</p>
      <label htmlFor="rating">User rating</label>
      <meter id="rating" className="meter" value={vote_average*10} min="1" max="100">{vote_average*10}%</meter>
      

      <div className="meter-outer">
        <div className="meter-inner" style={{width: `${vote_average*10}%`}}>
        </div>
      </div>
      <span>{vote_average*10}%</span>
      
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`}></img>
    </div>

  )
}

export default MovieDetail