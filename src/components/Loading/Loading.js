import React from 'react'
import bat from '../../images/bat.png'
import './Loading.scss'

const Loading = () => {
  return (
    <div className="loading-container">
        <h1>Loading...</h1>
        <img className="loading-img" src={bat} alt="Loading" />
    </div>
  )
}

export default Loading