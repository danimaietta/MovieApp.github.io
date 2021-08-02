import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'
import SeatingHeader from './SeatingHeader'
import SeatingFooter from './SeatingFooter'
import BackButton from '../BackButton'
import LocaleContext from '../../context/LocaleContext'
import { letters, numbers } from '../../utils/utils'
import { MdEventSeat } from 'react-icons/md'

export default function Seating({ match, history }) {
  const queryString = require('query-string')
  const { theme, getJSONSeats } = useContext(LocaleContext)
  const { id, movie } = queryString.parse(location.search)
  const hour = localStorage.getItem('hour')
  const jsonSeats = getJSONSeats(hour, id)
  const [seats, setSeats] = useState(jsonSeats.map(s => s)) // JSON file data
  const [seatNumbers, setSeatNumbers] = useState([]) // 0 - 41
  const [seatNames, setSeatNames] = useState([]) // A1 - G6
  const [validateMsg, setValidateMsg] = useState('')

  const calculateSeatName = array => {
    return array.map(sn => {
      let row = ~~(sn / 6 + 1)
      let column = row * 6 - sn
      return `${letters[--row]}${numbers[--column]}`
    })
  }

  const selectSeat = i => {
    if (seats[i] === 2) {
      //removes a selected seat
      const actualSeats = seatNumbers.filter(sn => sn !== i)
      seats[i] = 0
      setSeatNumbers(actualSeats)
      setSeatNames(calculateSeatName(actualSeats))
    } else {
      // add a selected seat
      setSeatNumbers([...seatNumbers, i])
      setSeatNames(calculateSeatName([...seatNumbers, i]))
      seats[i] = 2
    }
  }

  // hour in <select />
  const selectSeatsByHour = hour => {
    setSeatNumbers([])
    setSeatNames([])
    setSeats(getJSONSeats(hour, id).map(s => s))
  }

  const goToPayment = e => {
    if (seatNames.length == 0) {
      setValidateMsg('At least one seat must be selected')
      e.preventDefault()
    }
  }

  const toggleSeatClass = seat => {
    if (seat === 2) {
      return 'selected'
    } else if (seat === 1) {
      return 'taken'
    } else if (theme == 'light') {
      return 'freeLight'
    } else {
      return 'freeDark'
    }
  }

  return (
    <div className='container95'>
      <BackButton history={history} />
      <SeatingHeader movie={movie} theme={theme} />
      <div className='seats-container'>
        {seats.map((seat, i) => {
          return (
            <MdEventSeat
              key={i}
              className={`${toggleSeatClass(seat)}`}
              size='2em'
              onClick={() =>
                seat !== 1 ? selectSeat(i) : console.log('sit already taken')
              }
            />
          )
        })}
      </div>
      <SeatingFooter
        idMovie={parseInt(id)}
        movie={movie}
        seatCount={seatNumbers.length}
        seatNames={seatNames}
        selectSeatsByHour={selectSeatsByHour}
        goToPayment={goToPayment}
        validateMsg={validateMsg}
      />
    </div>
  )
}
