import React, { useState, useContext } from 'react'
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
import LocaleContext from '../../context/LocaleContext'
import QRcode from 'qrcode.react'

// PropTypes in this case?
export default function Payment(props) {
  const { getJSONSeats } = useContext(LocaleContext)
  const { idMovie, movie, price, seatNames, date, hour } = props.location.state
  const [seats, setSeats] = useState(() => getJSONSeats(hour, idMovie))
  const [cardInfo, setCardInfo] = useState({
    owner,
    cardNumber,
    cvv,
    month: 'January',
    year: '2021',
    type: 'Visa'
  })
  const [email, setEmail] = useState('')
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
    if (cardNumber && owner && cvv && !validateEmail(email)) {
      setMessages({ ...messages, success: 'Loading...' })
      sendEmail({ ...props.location.state, email }).then(
        () => {
          setMessages({
            cardNumberError: '',
            ownerError: '',
            cvvError: '',
            emailError: '',
            success: `The email was sended successfuly. 
                      Enjoy the movie!`
          })
          saveReservation()
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

  const saveReservation = () => {
    for (let i = 0; i < seatNames.length; i = i + 3) {
      const seat = seatNames.substring(i, i + 3)
      const letter = seat.substring(0, 1)
      const number = parseInt(seat.substring(1, 2))
      const res =
        letter == 'A'
          ? 0
          : letter == 'B'
          ? 6
          : letter == 'C'
          ? 12
          : letter == 'D'
          ? 18
          : letter == 'E'
          ? 24
          : letter == 'F'
          ? 30
          : 36
      seats[res + number - 1] = 1
    }
  }

  const { cardNumber, owner, cvv, month, year, type } = cardInfo
  const { cardNumberError, ownerError, cvvError, emailError, success } = messages

  const handleChange = attribute => e => {
    setCardInfo({ ...cardInfo, [attribute]: e.target.value })
  }

  return (
    <div className='container95'>
      <BackButton history={props.history} />
      <h4 className='paymentTitle'>
        {`You are going to watch ${movie} the ${date[1]} of ${months[date[0]]}`}
        <br />
        {`at ${hour} in the seat(s) ${seatNames} for $${price}`}
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
              onChange={handleChange('owner')}
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
            />
            {cardNumberError && <p className='error'>{cardNumberError}</p>}
          </div>
        </div>
        <div className='flex center space-between'>
          <div className='col'>
            <p>CVV</p>
            <input maxLength='3' placeholder='000' onChange={handleChange('cvv')}></input>
            {cvvError && <p className='error'>{cvvError}</p>}
          </div>
          <div className='col'>
            <p>Expiration Date</p>
            <div className='row'>
              <select onChange={handleChange('month')} role='monthSelect'>
                {months.map((m, i) => {
                  return (
                    <option key={i} value={m}>
                      {m}
                    </option>
                  )
                })}
              </select>
              <select id='slcYear' onChange={handleChange('year')} role='yearSelect'>
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
              role='faCcVisa'
              onClick={() => setCardInfo({ ...cardInfo, type: 'Visa' })}
              size='3em'
            />
          </div>
          <div className='col'>
            <FaCcPaypal
              className='faCCard'
              role='faCcPaypal'
              onClick={() => setCardInfo({ ...cardInfo, type: 'Paypal' })}
              size='3em'
            />
          </div>
          <div className='col'>
            <FaCcMastercard
              className='faCCard'
              role='faCcMastercard'
              onClick={() => setCardInfo({ ...cardInfo, type: 'MasterCard' })}
              size='3em'
            />
          </div>
        </div>
        <div className='flex center email space-between'>
          <p>Email:</p>
          <input
            maxLength='30'
            onChange={e => setEmail(e.target.value)}
            role='emailInput'
          ></input>
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
