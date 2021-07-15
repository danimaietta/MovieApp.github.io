import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'
import SeatingHeader from './SeatingHeader'
import SeatingFooter from './SeatingFooter'
import BackButton from '../BackButton'
import LocaleContext from '../../context/LocaleContext'
import { letters, numbers } from '../../utils/utils'

export default function Seating({ match, history }) {
  const { theme, getJSONSeats } = useContext(LocaleContext)
  const hour = localStorage.getItem('hour')
  const [seats, setSeats] = useState(() => getJSONSeats(hour, match.params.id)) // JSON file data
  const [seatNumbers, setSeatNumbers] = useState([]) // 0 - 41
  const [seatNames, setSeatNames] = useState([]) // A1 - G6
  const [indexOfSelectedSeats, setIndexOfSelectedSeats] = useState([]) // 1st seat = 0  last seat = 41
  const [validateMsg, setValidateMsg] = useState('')

  const calculateSeatName = array => {
    return array.map(sn => {
      let row = ~~(sn / 6 + 1)
      let column = row * 6 - sn
      return `${letters[--row]}${numbers[--column]}`
    })
  }

  /*useEffect(() => {
    return () =>
      seats.map((s, i) => s == 2 && setIndexOfSelectedSeats([...indexOfSelectedSeats, i]))
  }, [seats])*/

  const selectSeat = i => {
    if (seats[i] === 2) {
      //removes a selected seat
      const actualSeats = seatNumbers.filter(sn => sn !== i)
      seats[i] = 0
      setSeatNumbers(actualSeats)
      setSeatNames(calculateSeatName(actualSeats))
    } else {
      // add a selected seat
      setIndexOfSelectedSeats([...indexOfSelectedSeats, i])
      setSeatNumbers([...seatNumbers, i])
      setSeatNames(calculateSeatName([...seatNumbers, i]))
      seats[i] = 2
    }
  }

  const clearSelectedSeats = () => {
    for (let i of indexOfSelectedSeats) {
      seats[i] = 0
    }
  }

  // hour in <select />
  const selectSeatsByHour = async hour => {
    clearSelectedSeats()
    setSeatNumbers([])
    setSeatNames([])
    const newSeats = await getJSONSeats(hour, match.params.id).map(s => s)
    console.log('newSeats', ...newSeats)
    setSeats(newSeats)
  }

  const goToPayment = e => {
    if (indexOfSelectedSeats.length == 0) {
      setValidateMsg('At least one seat must be selected')
      e.preventDefault()
    }
  }

  const toggleSeatClass = seat => {
    if (seat === 2) {
      return 'selected'
    } else if (seat === 1) {
      return 'taken'
    } else {
      return 'free'
    }
  }

  return (
    <div className='container'>
      <BackButton history={history} />
      <SeatingHeader movie={match.params.movie} theme={theme} />
      <div className='seats-container'>
        {seats.map((seat, i) => {
          return (
            <div
              key={i}
              className={`seat ${toggleSeatClass(seat)}`}
              onClick={() =>
                seat !== 1 ? selectSeat(i) : console.log('sit already taken')
              }
            />
          )
        })}
      </div>
      <SeatingFooter
        idMovie={parseInt(match.params.id)}
        movie={match.params.movie}
        seatCount={seatNumbers.length}
        seatNames={seatNames}
        selectSeatsByHour={selectSeatsByHour}
        goToPayment={goToPayment}
        validateMsg={validateMsg}
      />
    </div>
  )
}
