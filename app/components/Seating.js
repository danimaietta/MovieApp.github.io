import React, { useState, useContext } from 'react'
import JSONSeats from '../utils/seating'
import LocaleContext from '../context/LocaleContext'

export default function Seating(props) {
  const movie = props.match.params.movie
  const { seats } = JSONSeats[props.match.params.id]
  let [allSeats, setAllSeats] = useState(() => seats.map(s => s))
  const [seatNumbers, setSeatNumbers] = useState([])
  const { theme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'
  const screenColor = theme == 'light' ? 'black-screen' : 'white-screen'

  const selectSeat = i => {
    allSeats[i] = !allSeats[i]
    setAllSeats([...allSeats])
    setSeatNumbers([...seatNumbers, i])
  }

  return (
    <div className='seats'>
      <h1 className={`movieTitle flex center ${classBtn}`}>{movie}</h1>
      <div className='seat-info flex row center'>
        Empty <div className={`seat ${classBtn}`} />
        Taken <div className='seat taken' />
        Selected <div className='seat selected' />
      </div>
      <div className={`screen ${screenColor}`}>screen</div>
      <div className='seats-container'>
        {allSeats.map((seat, i) => {
          return (
            <div
              key={i}
              className={`seat ${
                seatNumbers.includes(i) ? 'selected' : seat ? 'taken' : 'free'
              }`}
              onClick={() => seat == false && selectSeat(i)}
            />
          )
        })}
      </div>
    </div>
  )
}
