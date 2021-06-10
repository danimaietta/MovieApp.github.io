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
import QRcode from 'qrcode.react'

export default function Payment(props) {
  const { movie, price, seats, date, hour } = props.location.state
  const [owner, setOwner] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [cvv, setCvv] = useState()
  const [month, setMonth] = useState('January')
  const [year, setYear] = useState('2021')
  const [type, setType] = useState('Visa')
  const [email, setEmail] = useState()
  const [cardNumberErrorMsg, setCardNumberErrorMsg] = useState(null)
  const [ownerErrorMsg, setOwnerErrorMsg] = useState(null)
  const [cvvErrorMsg, setCvvErrorMsg] = useState(null)
  const [emailErrorMsg, setEmailErrorMsg] = useState(null)
  const [successFulMsg, setSuccessFulMsg] = useState(null)

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
        day: date[1],
        hour,
        month: months[date[0]],
        email,
        code: `${seats} - ${Math.random() * 10}`
      },
      'user_xGmxuVGkTxsGlfO5Nke6f'
    ).then(
      () => {
        setSuccessFulMsg('The email was sended successfuly Enjoy your movie!')
      },
      () => {
        setSuccessFulMsg('Ups! Something went wrong, please try again')
      }
    )
  }

  const validations = () => {
    setCardNumberErrorMsg(validateCardNumber(cardNumber))
    setOwnerErrorMsg(validateOwner(owner))
    setCvvErrorMsg(validateCVV(cvv))
    setEmailErrorMsg(validateEmail(email))
    if (cardNumber && owner && email && cvv) {
      setSuccessFulMsg('Loading...')
      sendEmail()
    }
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
        <div className='flex center'>
          <div className='col'>
            <p>Owner</p>
            <input
              placeholder='Insert Name'
              maxLength='17'
              onChange={e => setOwner(e.target.value)}
            ></input>
            {ownerErrorMsg && <p className='error'>{ownerErrorMsg}</p>}
          </div>
          <div className='col'>
            <p>Card Number</p>
            <input
              placeholder='0000 0000 0000 0000'
              onChange={e => addSpacesToCardNumber(e)}
            ></input>
            {cardNumberErrorMsg && (
              <p className='error'>{cardNumberErrorMsg}</p>
            )}
          </div>
        </div>
        <div className='flex center space-between'>
          <div className='col'>
            <p>CVV</p>
            <input
              maxLength='3'
              placeholder='000'
              onChange={e => setCvv(e.target.value)}
            ></input>
            {cvvErrorMsg && <p className='error'>{cvvErrorMsg}</p>}
          </div>
          <div className='col'>
            <p>Expiration Date</p>
            <div className='row'>
              <select onChange={e => setMonth(e.target.value)}>
                {months.map((m, i) => {
                  return (
                    <option key={i} value={m}>
                      {m}
                    </option>
                  )
                })}
              </select>
              <select id='slcYear' onChange={e => setYear(e.target.value)}>
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
              onClick={() => setType('Visa')}
              size='3em'
            />
          </div>
          <div className='col'>
            <FaCcPaypal
              className='faCCard'
              onClick={() => setType('Paypal')}
              size='3em'
            />
          </div>
          <div className='col'>
            <FaCcMastercard
              className='faCCard'
              onClick={() => setType('MasterCard')}
              size='3em'
            />
          </div>
        </div>
        <div className='flex center email space-between'>
          <p>Email:</p>
          <input
            maxLength='30'
            onChange={e => setEmail(e.target.value)}
          ></input>
          {emailErrorMsg && <p className='error'>{emailErrorMsg}</p>}
        </div>
        <div className='flex center space-between'>
          <button className='payment-button confirm-btn' onClick={validations}>
            Confirm
          </button>
          <br />
          <p>{successFulMsg}</p>
        </div>
      </div>
    </div>
  )
}
