import React from 'react'
import { screen } from '@testing-library/dom'
import { render, cleanup } from '@testing-library/react'
import CreditCard from '../app/components/Payment/CreditCard'

const creditCard = () => {
  render(
    <CreditCard
      cardNumber='0000 0000 0000 0000'
      owner='example name'
      cvv='123'
      month='Jan'
      year='2021'
      type='Visa'
    />
  )
}

afterEach(cleanup)
beforeEach(creditCard)

describe('Credit Card', () => {
  test('The text in the card number element should be: 0000 0000 0000 0000', () => {
    const cardNumber = screen.getByText(/0000 0000 0000 0000/i)
    expect(cardNumber).toBeTruthy()
  })
  test('The text in the owner element should be: example name', () => {
    const owner = screen.getByText(/example name/i)
    expect(owner).toBeTruthy()
  })
  test('The text in the expirationDate element should be: 1/21', () => {
    const expirationDate = screen.getByText('1/21')
    expect(expirationDate).toBeTruthy()
  })
  test('The icon rendered should be: FaCcVisa icon', () => {
    const cardType = screen.getByPlaceholderText(/visa/i)
    expect(cardType).toBeTruthy()
  })
  test('The text in the cvv element should be: 123', () => {
    const cvv = screen.getByText(/123/i)
    expect(cvv).toBeTruthy()
  })
})
