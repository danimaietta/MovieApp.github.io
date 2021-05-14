import React from 'react'

function Seating({ movie, theme }) {
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'
  const screenColor = theme == 'light' ? 'black-screen' : 'white-screen'

  return (
    <>
      <h1 className={`movieTitle flex center ${classBtn}`}>{movie}</h1>
      <div className='seat-header flex row center'>
        Empty <div className={`seat ${classBtn}`} />
        Taken <div className='seat taken' />
        Selected <div className='seat selected' />
      </div>
      <div className={`screen ${screenColor}`}>screen</div>
    </>
  )
}

export default React.memo(Seating)
