import React from 'react'
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from 'react-icons/fa'
import { FcSimCardChip } from 'react-icons/fc'
import PropTypes from 'prop-types'

export default function CreditCard({
  cardNumber = '0000 0000 0000 0000',
  owner = 'example name',
  cvv,
  month,
  year,
  type
}) {
  return (
    <div className='creditCard'>
      <div className='frontSideCreditCard'>
        <div className='chipCard'>
          <FcSimCardChip border-radius='5px' size='3em' />
        </div>
        <p className='cardNumber'>{cardNumber}</p>
        <p className='owner'>{owner.toUpperCase()}</p>
        <p className='expirationDate'>
          {new Date(`${month} 25, 1995 23:15:30`).getMonth() + 1}/{year.slice(2, 4)}
        </p>
        <div className='cardType' role='cardTypeRole'>
          {type === 'Visa' && <FaCcVisa size='4em' placeholder='visa' />}
          {type === 'Paypal' && <FaCcPaypal size='4em' placeholder='paypal' />}
          {type === 'MasterCard' && <FaCcMastercard size='4em' />}
        </div>
      </div>
      <div className='backSideCreditCard'>
        <div className='magneticStripe'></div>
        <div className='cvv'>{cvv}</div>
      </div>
    </div>
  )
}

CreditCard.propTypes = {
  cardNumber: PropTypes.string,
  owner: PropTypes.string,
  cvv: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  type: PropTypes.string
}
