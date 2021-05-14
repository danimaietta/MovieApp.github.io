import React, { useState, useContext, useCallback } from 'react'
import SeatingHeader from './SeatingHeader'
import SeatingFooter from './SeatingFooter'
import JSONSeats from '../../utils/seating'
import LocaleContext from '../../context/LocaleContext'

export default function Seating(props) {
  const { seats } = JSONSeats[props.match.params.id]
  let [allSeats, setAllSeats] = useState(() => seats.map(s => s))
  const [seatNumbers, setSeatNumbers] = useState([])
  const [seatNames, setSeatNames] = useState([])
  const { theme } = useContext(LocaleContext)

  const calculateSeatName = i => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const numbers = [6, 5, 4, 3, 2, 1]
    const numberSeats = seatNumbers.length == 0 ? [i] : seatNumbers.concat(i)
    return numberSeats.map(sn => {
      let row = ~~(sn / 6 + 1)
      let column = row * 6 - sn
      return `${letters[row - 1]}${numbers[column - 1]}`
    })
  }

  const selectSeat = i => {
    allSeats[i] = !allSeats[i]
    setAllSeats([...allSeats])
    if (seatNumbers.includes(i)) {
      //seatNumbers.splice(seatNumbers.indexOf(i), 1)

      setSeatNumbers(seatNumbers.filter(sn => sn !== i))
    } else {
      setSeatNumbers([...seatNumbers, i])
    }
    setSeatNames(calculateSeatName(i))
  }

  return (
    <div className='seats'>
      <SeatingHeader movie={props.match.params.movie} theme={theme} />
      <div className='seats-container'>
        {allSeats.map((seat, i) => {
          return (
            <div
              key={i}
              className={`seat ${
                seatNumbers.includes(i) ? 'selected' : seat ? 'taken' : 'free'
              }`}
              onClick={() =>
                seat == false || seatNumbers.includes(i) ? selectSeat(i) : ''
              }
            />
          )
        })}
      </div>
      <SeatingFooter seatCount={seatNumbers.length} seatNames={seatNames} />
    </div>
  )
}
