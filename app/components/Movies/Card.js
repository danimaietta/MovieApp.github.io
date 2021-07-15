import React from 'react'
import Proptypes from 'prop-types'

export default function Card({ poster }) {
  return (
    <div className='card'>
      <img
        src={`https://www.cinecalidad.page/movies/static/img/w500${poster}`}
        alt='not found'
      />
    </div>
  )
}

Card.propType = {
  poster: Proptypes.string
}
