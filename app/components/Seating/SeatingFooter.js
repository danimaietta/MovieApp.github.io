import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function SeatingFooter({
  idMovie,
  movie,
  seatCount = 0,
  seatNames = [],
  selectSeatsByHour,
  goToPayment,
  validateMsg
}) {
  const price = seatCount * 13
  const seats = seatNames.reduce((s, a) => `${a} ${s}`, '')
  const date = [new Date().getMonth() + 1, new Date().getDate()]
  const [hour, setHour] = useState(localStorage.getItem('hour'))
  const hoursList = ['2:00pm', '5:30pm', '9:00pm']
  const getHour = e => {
    selectSeatsByHour(e.target.value)
    localStorage.setItem('hour', e.target.value)
    setHour(e.target.value)
  }

  const getDateFormat = () => {
    const month = date[0] < 10 ? `0${date[0]}` : date[0]
    const day = date[1] < 10 ? `0${date[1]}` : date[1]
    return `${day} / ${month}`
  }

  return (
    <div className='seat-footer-container'>
      <div className='item-footer'>Date: {getDateFormat()}</div>
      <div className='item-footer'>
        <div>
          Hour: {'    '}
          <select id='hour-select' onChange={e => getHour(e)} value={hour}>
            {hoursList.map((h, i) => {
              return (
                <option key={i} value={h}>
                  {h}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className='item-footer'>Seats: {seats}</div>
      <div className='item-footer'>Price: ${price}</div>
      <Link
        className='link'
        to={{
          pathname: `/MovieApp/payment/${idMovie}${movie}${price}${seats}${date}${hour}`,
          state: { idMovie, movie, price, seatNames: seats, date, hour }
        }}
      >
        <button className='payment-button' onClick={e => goToPayment(e)}>
          Payment
        </button>
      </Link>
      <div className='item-footer'>{validateMsg}</div>
    </div>
  )
}

SeatingFooter.propTypes = {
  idMovie: PropTypes.number.isRequired,
  movie: PropTypes.string.isRequired,
  seatCount: PropTypes.number.isRequired,
  seatNames: PropTypes.arrayOf(PropTypes.string),
  selectSeatsByHour: PropTypes.func.isRequired,
  goToPayment: PropTypes.func.isRequired,
  validateMsg: PropTypes.string.isRequired
}
