import React from 'react'
import PropTypes from 'prop-types'
import { MdEventSeat } from 'react-icons/md'
function SeatingHeader({ movie, theme }) {
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'
  const screenColor = theme == 'light' ? 'black-screen' : 'white-screen'

  return (
    <>
      <h1 className={`movieTitle flex center ${classBtn}`}>{movie}</h1>
      <div className='seat-header flex wrap center'>
        Empty <MdEventSeat size='2em' className='free' />
        Taken <MdEventSeat size='2em' className='taken' />
        Selected <MdEventSeat size='2em' className='selected' />
      </div>
      <div className={`screen ${screenColor}`} />
    </>
  )
}

SeatingHeader.propTypes = {
  theme: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired
}

export default React.memo(SeatingHeader)
