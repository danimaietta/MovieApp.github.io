import React from 'react'
import { Link } from 'react-router-dom'

export default function SeatingFooter({
  seatCount = 0,
  seatNames = [],
  selectSeatsByHour,
  goToPayment
}) {
  const date = `${new Date().getDate()}/${new Date().getMonth() + 1}`
  const hoursList = ['2:00pm', '5:30pm', '9:00pm']

  return (
    <div className='seat-footer-container'>
      <div className='item-footer'>Date: {date}</div>
      <div className='item-footer'>
        <div>
          Hour: {'    '}
          <select onChange={event => selectSeatsByHour(event.target.value)}>
            <option value={hoursList[0]}>{hoursList[0]}</option>
            <option value={hoursList[1]}>{hoursList[1]}</option>
            <option value={hoursList[2]}>{hoursList[2]}</option>
          </select>
        </div>
      </div>
      <div className='item-footer'>
        Seats: {seatNames.reduce((s, a) => `${a} ${s}`, '')}
      </div>
      <div className='item-footer'>Price: ${seatCount * 13}</div>
      <Link className='link' to='/payment'>
        <button className='payment-button' onClick={goToPayment}>
          Payment
        </button>
      </Link>
    </div>
  )
}
