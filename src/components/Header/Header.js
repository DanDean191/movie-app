import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Header.scss'

import { useDispatch } from 'react-redux'
import { updateSearchTerm, resetMovies } from '../../features/movies/moviesSlice'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const saveSearchTerm = () => { 
    dispatch(updateSearchTerm(searchTerm)) 
    navigate('/')
  }

  const enterCheck = (e) => {
    if (e.key === 'Enter') saveSearchTerm()
  }

  return (
    <div className="header">
      <Link to={'/'} onClick={() => dispatch(resetMovies())}>
        <div className="logo">Sp00kyFlix</div>
      </Link>

      <div className="searchbar">
        <input type="text" className="" onChange={(e)=>setSearchTerm(e.target.value)} onKeyUp={(e)=> enterCheck(e)} />
        <button onClick={saveSearchTerm} >Search</button>
      </div>
    </div>
  )
}

export default Header