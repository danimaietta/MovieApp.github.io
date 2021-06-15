import React, { useState, useEffect, useContext, useMemo } from 'react'
import SeatingHeader from './SeatingHeader'
import SeatingFooter from './SeatingFooter'
import BackButton from '../BackButton'
import JSONSeats from '../../utils/seating'
import LocaleContext from '../../context/LocaleContext'
import { letters, numbers } from '../../utils/utils'

export default function Seating({ match, history }) {
  const getSeats = (hour = '2:00pm') => {
    return JSONSeats.filter(jsonS => jsonS.id == match.params.id && jsonS.hour == hour)
  }
  let [{ seats }] = useMemo(() => getSeats(), []) // referenced json [true, false, true]
  let [allSeats, setAllSeats] = useState(() => seats.map(s => s)) // unreferenced json obj [true, false, true]
  const localSeats = JSON.parse(localStorage.getItem('seatNumbers'))
  const [seatNumbers, setSeatNumbers] = useState(localSeats) // 0 - 41
  const [seatNames, setSeatNames] = useState([]) // A1 - G6
  const { theme } = useContext(LocaleContext)
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
    /* 
      save data in unferenced obj
        allSeats[i] = !allSeats[i]
        setAllSeats([...allSeats]) 
    */
    if (seatNumbers.includes(i)) {
      //removes a selected seat
      const actualSeats = seatNumbers.filter(sn => sn !== i)
      setSeatNumbers(actualSeats)
      setSeatNames(calculateSeatName(actualSeats))
    } else if (e.target.className != 'seat selected') {
      // add a selected seat
      setSeatNumbers([...seatNumbers, i])
      setSeatNames(calculateSeatName([...seatNumbers, i]))
    }
  }

  // hour in <select />
  const selectSeatsByHour = hour => {
    setSeatNumbers([])
    setSeatNames([])
    setAllSeats(getSeats(hour)[0].seats.map(s => s))
  }

  // remembers the selected seats before you go to /payment
  // useRef
  const goToPayment = e => {
    if (seatNumbers.length > 0 && seatNames.length > 0) {
      // allSeats.map((seat, i) => {
      //   seats[i] = seat
      // })
    } else {
      setValidateMsg('At least one seat must be selected')
      e.preventDefault()
    }
  }

  useEffect(() => {
    localStorage.setItem('seatNumbers', JSON.stringify(seatNumbers))
  })

  const toggleSeatClass = (seat, i) => {
    if (seatNumbers.includes(i)) {
      return 'selected'
    } else if (seat) {
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
        {allSeats.map((seat, i) => {
          return (
            <div
              key={i}
              className={`seat ${toggleSeatClass(seat, i)}`}
              onClick={e =>
                !seat || seatNumbers.includes(i)
                  ? selectSeat(e, i)
                  : console.log('sit already taken')
              }
            />
          )
        })}
      </div>
      <SeatingFooter
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
