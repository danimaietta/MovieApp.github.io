import React from 'react'
import Proptypes from 'prop-types'

export default function Card({ title, poster }) {
  return (
    <div className='card'>
      <h4>{title}</h4>
      <img
        src={`https://www.cinecalidad.page/movies/static/img/w500${poster}`}
        alt='not found'
      />
    </div>
  )
}
