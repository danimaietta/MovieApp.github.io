import React, { useState } from 'react'
import BackButton from '../BackButton'
import CreditCard from './CreditCard'
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from 'react-icons/fa'
import {
  validateCardNumber,
  validateOwner,
  validateCVV,
  validateEmail
} from '../../utils/paymentValidations'
import { months, years } from '../../utils/utils'
import { send, init } from 'emailjs-com'

export default function Payment(props) {
  const { movie, price, seats, date, hour } = props.location.state
  const [owner, setOwner] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [cvv, setCvv] = useState()
  const [month, setMonth] = useState('January')
  const [year, setYear] = useState('2021')
  const [type, setType] = useState('Visa')
  const [email, setEmail] = useState()
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState(null)
  const [ownerErrorMessage, setOwnerErrorMessage] = useState(null)
  const [cvvErrorMessage, setCvvErrorMessage] = useState(null)
  const [emailErrorMessage, setEmailErrorMessage] = useState(null)

  const addSpacesToCardNumber = e => {
    const cardNumber = e.target.value
    const fixedNumber = cardNumber
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .substring(0, 19)
    setCardNumber(fixedNumber)
    e.target.value = fixedNumber
  }

  init('user_xGmxuVGkTxsGlfO5Nke6f')
  const sendEmail = () => {
    send(
      'service_h10tdd8',
      'template_wjrhujl',
      {
        movie,
        price,
        seats,
        day: date,
        hour,
        month,
        email,
        QRcode: 'QRtestString'
      },
      'user_xGmxuVGkTxsGlfO5Nke6f'
    ).then(
      result => {
        console.log(result)
      },
      error => {
        console.log(error)
      }
    )
  }

  const validations = () => {
    setCardNumberErrorMessage(validateCardNumber(cardNumber))
    setOwnerErrorMessage(validateOwner(owner))
    setCvvErrorMessage(validateCVV(cvv))
    setEmailErrorMessage(validateEmail(email))
    //if ((cardNumber, owner, email, cvv)) {
    sendEmail()
    // }
  }

  return (
    <div className='container'>
      <BackButton history={props.history} />
      <h4 className='paymentTitle'>
        {`You are goig to watch ${movie} the ${date[1]} of ${months[date[0]]}`}
        <br />
        {`at ${hour} in the seat(s) ${seats} for $${price}`}
      </h4>
      <CreditCard
        cardNumber={cardNumber}
        owner={owner}
        cvv={cvv}
        month={month}
        year={year}
        type={type}
      />
      <div className='cardForm'>
        Owner
        <input
          placeholder='Insert Name'
          maxLength='17'
          onChange={e => setOwner(e.target.value)}
        ></input>
        {ownerErrorMessage && <p className='error'>{ownerErrorMessage}</p>}
        Card Number
        <input
          placeholder='0000 0000 0000 0000'
          onChange={e => addSpacesToCardNumber(e)}
        ></input>
        {cardNumberErrorMessage && (
          <p className='error'>{cardNumberErrorMessage}</p>
        )}
        CVV
        <input
          maxLength='3'
          placeholder='000'
          onChange={e => setCvv(e.target.value)}
        ></input>
        {cvvErrorMessage && <p className='error'>{cvvErrorMessage}</p>}
        Expiration Date
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
        Email:{' '}
        <input maxLength='30' onChange={e => setEmail(e.target.value)}></input>
        {emailErrorMessage && <p className='error'>{emailErrorMessage}</p>}
        <button onClick={validations}>Confirm</button>
      </div>
    </div>
  )
}
