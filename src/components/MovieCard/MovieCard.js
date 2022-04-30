import React, { useState, useEffect } from 'react'
import './MovieCard.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoadingState } from '../../features/movies/moviesSlice'

const MovieCard = ({data}) => {
  const loading = useSelector(selectLoadingState)
  const [loaded, setLoaded] = useState('loading')


  return (
    <>
      { 
        loading ? <div className="card-loading"></div>
        : <Link to={`/movie/${data.id}`} >
          <div className="card-item">
            <div className="card-inner">
              <div className="card-top">
                {loaded === 'loading' && <div className="card-loading"></div>}
                <img className={loaded} src={`https://image.tmdb.org/t/p/original${data.poster_path}`} onLoad={() => setLoaded('')} />
              </div>
              <div className="card-bottom">
                <div className="card-info">
                  <h4>{data.title}</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
      }
    </>

    
  )
}

export default MovieCard