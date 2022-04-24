import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './Header.scss'

import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../../features/movies/moviesSlice'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()
  const saveSearchTerm = () => dispatch(updateSearchTerm(searchTerm))

  const enterCheck = (e) => {
    if (e.key === 'Enter') saveSearchTerm()
  }

  return (
    <div className="header">
      <Link to={'/'} >
        <div className="logo">Sp00kyFlix</div>
      </Link>

      <div>
        <input type="text" className="" onChange={(e)=>setSearchTerm(e.target.value)} onKeyUp={(e)=> enterCheck(e)}></input>
        <button onClick={saveSearchTerm} >Search</button>
      </div>
    </div>
  )
}

export default Header