import React from 'react'
import './MovieCard.scss'
import { Link } from 'react-router-dom'

const MovieCard = ({data}) => {
  return (
    <Link to={`/movie/${data.id}`} >
      <div className="card-item">
        <div className="card-inner">
          <div className="card-top">
            <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} ></img>
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{data.title}</h4>
              {/* <p>{data.release_date.slice(0,4)}</p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard