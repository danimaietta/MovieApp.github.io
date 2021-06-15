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
import sendEmail from '../../utils/email'
import QRcode from 'qrcode.react'

export default function Payment(props) {
  const { movie, price, seats, date, hour } = props.location.state
  const [cardInfo, setCardInfo] = useState({
    owner,
    cardNumber,
    cvv,
    month: 'January',
    year: '2021',
    type: 'Visa'
  })
  const [email, setEmail] = useState()
  const [messages, setMessages] = useState({
    cardNumberError,
    ownerError,
    cvvError,
    emailError,
    success
  })

  const addSpacesToCardNumber = value => {
    return value
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .substring(0, 19)
  }

  const validations = () => {
    const { cardNumber, owner, cvv } = cardInfo
    setMessages({
      ...messages,
      ownerError: validateOwner(owner),
      cardNumberError: validateCardNumber(cardNumber),
      cvvError: validateCVV(cvv),
      emailError: validateEmail(email)
    })
    if (cardNumber && owner && email && cvv) {
      setMessages({ ...messages, success: 'Loading...' })
      sendEmail({ ...props.location.state, email }).then(
        () => {
          setMessages({
            ...messages,
            success: `The email was sended successfuly. 
                      Enjoy the movie!`
          })
        },
        () => {
          setMessages({
            ...messages,
            success: 'Ups! Something went wrong, please try again'
          })
        }
      )
    }
  }

  const { cardNumber, owner, cvv, month, year, type } = cardInfo
  const { cardNumberError, ownerError, cvvError, emailError, success } = messages

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
        <div className='flex center'>
          <div className='col'>
            <p>Owner</p>
            <input
              placeholder='Insert Name'
              maxLength='17'
              onChange={e => setCardInfo({ ...cardInfo, owner: e.target.value })}
            ></input>
            {ownerError && <p className='error'>{ownerError}</p>}
          </div>
          <div className='col'>
            <p>Card Number</p>
            <input
              placeholder='0000 0000 0000 0000'
              onChange={e => {
                let cardNumber = addSpacesToCardNumber(e.target.value)
                setCardInfo({ ...cardInfo, cardNumber })
                e.target.value = cardNumber
              }}
            ></input>
            {cardNumberError && <p className='error'>{cardNumberError}</p>}
          </div>
        </div>
        <div className='flex center space-between'>
          <div className='col'>
            <p>CVV</p>
            <input
              maxLength='3'
              placeholder='000'
              onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
            ></input>
            {cvvError && <p className='error'>{cvvError}</p>}
          </div>
          <div className='col'>
            <p>Expiration Date</p>
            <div className='row'>
              <select onChange={e => setCardInfo({ ...cardInfo, month: e.target.value })}>
                {months.map((m, i) => {
                  return (
                    <option key={i} value={m}>
                      {m}
                    </option>
                  )
                })}
              </select>
              <select
                id='slcYear'
                onChange={e => setCardInfo({ ...cardInfo, year: e.target.value })}
              >
                {years.map((y, i) => {
                  return (
                    <option key={i} value={y}>
                      {y}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
        <div className='flex wrap center'>
          <div className='col'>
            <FaCcVisa
              className='faCCard'
              onClick={() => setCardInfo({ ...cardInfo, type: 'Visa' })}
              size='3em'
            />
          </div>
          <div className='col'>
            <FaCcPaypal
              className='faCCard'
              onClick={() => setCardInfo({ ...cardInfo, type: 'Paypal' })}
              size='3em'
            />
          </div>
          <div className='col'>
            <FaCcMastercard
              className='faCCard'
              onClick={() => setCardInfo({ ...cardInfo, type: 'MasterCard' })}
              size='3em'
            />
          </div>
        </div>
        <div className='flex center email space-between'>
          <p>Email:</p>
          <input maxLength='30' onChange={e => setEmail(e.target.value)}></input>
          {emailError && <p className='error'>{emailError}</p>}
        </div>
        <div className='flex center space-between'>
          <button className='payment-button confirm-btn' onClick={validations}>
            Confirm
          </button>
          <br />
          <p>{success}</p>
        </div>
      </div>
    </div>
  )
}
