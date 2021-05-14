import React, { useState, useContext } from 'react'

export default function SeatingFooter({ seatCount = 0, seatNames = [] }) {
  const date = `${new Date().getDate()}/${new Date().getMonth() + 1}`
  const hoursList = ['2:00pm', '5:30pm', '9:00pm']

  return (
    <div className='seat-footer-container'>
      <div className='item-footer'>Date: {date}</div>
      <div className='item-footer'>Hour: {hoursList[0]} </div>
      <div className='item-footer'>
        Seats: {seatNames.reduce((s, a) => `${a}, ${s}`, '')}
      </div>
      <div className='item-footer'>Price: ${seatCount * 13}</div>
      <div className='payment-button'>Payment </div>
    </div>
  )
}
