import React, { useState } from 'react'
import BackButton from '../BackButton'
import CreditCard from './CreditCard'
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from 'react-icons/fa'
import {
  validateCardNumber,
  validateOwner,
  validateCVV
} from '../../utils/paymentValidations'

export default function Payment(props) {
  const months = [
    'January',
    'February',
    'Mars',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const years = [
    2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032
  ]

  const [owner, setOwner] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [cvv, setCvv] = useState()
  const [month, setMonth] = useState('January')
  const [year, setYear] = useState('2021')
  const [type, setType] = useState('Visa')
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState(null)
  const [ownerErrorMessage, setOwnerErrorMessage] = useState(null)
  const [cvvErrorMessage, setCvvErrorMessage] = useState(null)

  const addSpacesToCardNumber = e => {
    const cardNumber = e.target.value
    const fixedNumber = cardNumber
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .substring(0, 19)
    setCardNumber(fixedNumber)
    e.target.value = fixedNumber
  }

  const validations = () => {
    setCardNumberErrorMessage(validateCardNumber(cardNumber))
    setOwnerErrorMessage(validateOwner(owner))
    setCvvErrorMessage(validateCVV(cvv))
  }

  return (
    <div className='container'>
      <BackButton history={props.history} />
      <CreditCard
        cardNumber={cardNumber}
        owner={owner}
        cvv={cvv}
        month={month}
        year={year}
        type={type}
      />
      <div className='cardForm'>
        <h4>Owner</h4>
        <input
          placeholder='Insert Name'
          maxLength='17'
          onChange={e => setOwner(e.target.value)}
        ></input>
        {ownerErrorMessage && <p className='error'>{ownerErrorMessage}</p>}
        <h4>Card Number</h4>
        <input
          placeholder='0000 0000 0000 0000'
          onChange={e => addSpacesToCardNumber(e)}
        ></input>
        {cardNumberErrorMessage && (
          <p className='error'>{cardNumberErrorMessage}</p>
        )}
        <h4>CVV</h4>
        <input
          maxLength='3'
          placeholder='000'
          onChange={e => setCvv(e.target.value)}
        ></input>
        {cvvErrorMessage && <p className='error'>{cvvErrorMessage}</p>}
        <h4>Expiration Date</h4>
        <select onChange={e => setMonth(e.target.value)}>
          {months.map((m, i) => {
            return (
              <option key={i} value={m}>
                {m}
              </option>
            )
          })}
        </select>
        <select onChange={e => setYear(e.target.value)}>
          {years.map((y, i) => {
            return (
              <option key={i} value={y}>
                {y}
              </option>
            )
          })}
        </select>
        <div>
          <FaCcVisa
            className='faCCard'
            onClick={() => setType('Visa')}
            size='3em'
          />
          <FaCcPaypal
            className='faCCard'
            onClick={() => setType('Paypal')}
            size='3em'
          />
          <FaCcMastercard
            className='faCCard'
            onClick={() => setType('MasterCard')}
            size='3em'
          />
        </div>
        <button onClick={validations}>Confirm</button>
      </div>
    </div>
  )
}
