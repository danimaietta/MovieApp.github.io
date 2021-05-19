import React, { useState, useContext, useMemo } from 'react'
import SeatingHeader from './SeatingHeader'
import SeatingFooter from './SeatingFooter'
import BackButton from '../BackButton'
import JSONSeats from '../../utils/seating'
import LocaleContext from '../../context/LocaleContext'

export default function Seating({ match, history }) {
  const getSeats = (hour = '2:00pm') => {
    return JSONSeats.filter(
      jsonS => jsonS.id == match.params.id && jsonS.hour == hour
    )
  }
  let [[{ seats }], setSeats] = useState(useMemo(() => getSeats(), [])) // referenced json obj
  let [allSeats, setAllSeats] = useState(() => seats.map(s => s)) // unreferenced json obj
  const [seatNumbers, setSeatNumbers] = useState([]) // 0 - 41
  const [seatNames, setSeatNames] = useState([]) // A1 - G6
  const { theme } = useContext(LocaleContext)
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const numbers = [6, 5, 4, 3, 2, 1]

  const calculateSeatName = array => {
    return array.map(sn => {
      let row = ~~(sn / 6 + 1)
      let column = row * 6 - sn
      return `${letters[row - 1]}${numbers[column - 1]}`
    })
  }

  const selectSeat = i => {
    allSeats[i] = !allSeats[i]
    setAllSeats([...allSeats])
    if (seatNumbers.includes(i)) {
      const actualSeats = seatNumbers.filter(sn => sn !== i)
      setSeatNumbers(actualSeats)
      setSeatNames(calculateSeatName(actualSeats))
    } else {
      setSeatNumbers([...seatNumbers, i])
      setSeatNames(calculateSeatName([...seatNumbers, i]))
    }
  }

  const selectSeatsByHour = hour => {
    setSeatNumbers([])
    setSeatNames([])
    setAllSeats(getSeats(hour)[0].seats.map(s => s))
  }

  const goToPayment = () => {
    allSeats.map((seat, i) => {
      seats[i] = seat
    })
  }

  return (
    <div className='seats'>
      <BackButton history={history} />
      <SeatingHeader movie={match.params.movie} theme={theme} />
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
      <SeatingFooter
        seatCount={seatNumbers.length}
        seatNames={seatNames}
        selectSeatsByHour={selectSeatsByHour}
        goToPayment={goToPayment}
      />
    </div>
  )
}