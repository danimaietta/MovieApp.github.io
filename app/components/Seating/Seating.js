import React, { useState, useContext, useMemo, useCallback } from 'react'
import SeatingHeader from './SeatingHeader'
import SeatingFooter from './SeatingFooter'
import BackButton from '../BackButton'
import LocaleContext from '../../context/LocaleContext'
import { letters, numbers } from '../../utils/utils'

export default function Seating({ match, history }) {
  const { theme, getJSONSeats } = useContext(LocaleContext)
  const hour = localStorage.getItem('hour')
  const [seats, setSeats] = useState(
    useMemo(() => getJSONSeats(hour, match.params.id), [])
  )
  const [indexOfSelectedSeats, setIndexOfSelectedSeats] = useState([])
  //console.log('indexOfSelectedSeats', indexOfSelectedSeats)
  const [seatNumbers, setSeatNumbers] = useState([]) // 0 - 41
  const [seatNames, setSeatNames] = useState([]) // A1 - G6
  const [validateMsg, setValidateMsg] = useState('')

  const calculateSeatName = array => {
    return array.map(sn => {
      let row = ~~(sn / 6 + 1)
      let column = row * 6 - sn
      return `${letters[row - 1]}${numbers[column - 1]}`
    })
  }

  // updates seatNumbers/Names
  const selectSeat = (e, i) => {
    setIndexOfSelectedSeats([...indexOfSelectedSeats, i])
    if (seatNumbers.includes(i) || seats[i] === 2) {
      //removes a selected seat
      const actualSeats = seatNumbers.filter(sn => sn !== i)
      seats[i] = 0
      setSeatNumbers(actualSeats)
      setSeatNames(calculateSeatName(actualSeats))
    } else {
      // add a selected seat
      seats[i] = 2
      setSeatNumbers([...seatNumbers, i])
      setSeatNames(calculateSeatName([...seatNumbers, i]))
    }
    //setSeats(seats)
  }

  const clearSelectedSeats = () => {
    for (let i of indexOfSelectedSeats) {
      seats[i] = 0
      setSeats(seats)
    }
  }

  // hour in <select />
  const selectSeatsByHour = hour => {
    setSeatNumbers([])
    setSeatNames([])
    clearSelectedSeats()
    setSeats(getJSONSeats(hour, match.params.id).map(s => s))
  }

  // remembers the selected seats before you go to /payment
  // useRef
  const goToPayment = e => {
    if (seatNumbers.length == 0 && seatNames.length == 0) {
      setValidateMsg('At least one seat must be selected')
      e.preventDefault()
    }
  }

  const toggleSeatClass = (seat, i) => {
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
              className={`seat ${toggleSeatClass(seat, i)}`}
              onClick={e =>
                seat !== 1 ? selectSeat(e, i) : console.log('sit already taken')
              }
            />
          )
        })}
      </div>
      <SeatingFooter
        idMovie={match.params.id}
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
