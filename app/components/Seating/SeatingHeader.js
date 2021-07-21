import React from 'react'
import PropTypes from 'prop-types'

function SeatingHeader({ movie, theme }) {
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'
  const screenColor = theme == 'light' ? 'black-screen' : 'white-screen'

  return (
    <>
      <h1 className={`movieTitle flex center ${classBtn}`}>{movie}</h1>
      <div className='seat-header flex row center'>
        Empty <div className={`seat free`} />
        Taken <div className='seat taken' />
        Selected <div className='seat selected' />
      </div>
      <div className={`screen ${screenColor}`}>screen</div>
    </>
  )
}

SeatingHeader.propTypes = {
  theme: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired
}

export default React.memo(SeatingHeader)
