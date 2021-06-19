import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
  const [hour, setHour] = useState('2:00pm')
  const hoursList = ['2:00pm', '5:30pm', '9:00pm']
  const getHour = e => {
    selectSeatsByHour(e.target.value)
    setHour(e.target.value)
  }

  return (
    <div className='seat-footer-container'>
      <div className='item-footer'>Date: {date}</div>
      <div className='item-footer'>
        <div>
          Hour: {'    '}
          <select id='hour-select' onChange={e => getHour(e)}>
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
          pathname: `/payment/${idMovie}${movie}${price}${seats}${date}${hour}`,
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
