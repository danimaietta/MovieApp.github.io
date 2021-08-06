import React, { memo } from 'react'
import Proptypes from 'prop-types'

function Card({ poster }) {
  console.count('Card')
  return (
    <div className='card'>
      <img
        src={`https://www.cinecalidad.page/movies/static/img/w500${poster}`}
        alt='not found'
      />
    </div>
  )
}

export default memo(Card)

Card.propType = {
  poster: Proptypes.string
}
