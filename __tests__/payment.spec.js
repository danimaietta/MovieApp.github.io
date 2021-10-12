import React from 'react'
import Payment from '../app/components/Payment/Payment'
import CreditCard from '../app/components/Payment/CreditCard'
import LocaleContext from '../app/context/LocaleContext'
import { screen, render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'
import JSONSeats from '../app/utils/seating.json'

const theme = 'dark'
const getJSONSeats = jest.fn((hour, id) => JSONSeats)
const state = {
  idMovie: 1,
  movie: 'Deathstroke: Knights',
  price: '26',
  seatNames: 'C3 C2',
  date: ['10', '5'],
  hour: '2:00pm'
}

const payment = () => {
  const history = {
    goBack: () => jest.fn()
  }

  render(
    <LocaleContext.Provider value={{ theme, getJSONSeats }}>
      <Payment location={{ state }} history={history}>
        <CreditCard
          cardNumber='0000 0000 0000 0000'
          owner='example name'
          cvv='123'
          month='Jan'
          year='2021'
          type='Visa'
        />
      </Payment>
    </LocaleContext.Provider>
  )
}

afterEach(cleanup)
beforeEach(payment)

describe('Payment', () => {
  test('Check the payment title should say: ', () => {
    const paymentTitle = screen.getByText(
      /You are going to watch Deathstroke: Knights the 5 of November/i,
      / at 2:00pm in the seat(s) C3 C2 for $26/i
    )
    expect(paymentTitle).toBeTruthy()
  })
  //owner
  test('Check that owner title exists', () => {
    const owner = screen.getByText(/Owner/i)
    expect(owner).toBeTruthy()
  })
  test('Check that changing the owner input also changes the credit card owner', () => {
    const owner = screen.getByPlaceholderText(/Insert Name/i)
    fireEvent.change(owner, { target: { value: 'Daniel Maietta E' } })
    const creditCardOwner = screen.getByText(/Daniel Maietta E/i)
    expect(creditCardOwner).toBeTruthy()
  })
  // card number
  test('Check that card number title exists', () => {
    const cardNumber = screen.getByText(/Card Number/i)
    expect(cardNumber).toBeTruthy()
  })
  test('Check that changing the card number input also changes the credit card number', () => {
    const cardNumber = screen.getByPlaceholderText('0000 0000 0000 0000')
    fireEvent.change(cardNumber, { target: { value: '1111 2222 3333 4444' } })
    const creditCardNumber = screen.getByText('1111 2222 3333 4444')
    expect(creditCardNumber).toBeTruthy()
  })
  // cvv
  test('Check that the cvv title exists', () => {
    const cvv = screen.getByText(/CVV/i)
    expect(cvv).toBeTruthy()
  })
  test('Check that changing the cvv input also changes the credit card cvv', () => {
    const cvv = screen.getByPlaceholderText('000')
    fireEvent.change(cvv, { target: { value: '123' } })
    const creditCardCVV = screen.getByText('123')
    expect(creditCardCVV).toBeTruthy()
  })
  // expiration date
  test('Check that the expiration date title exists', () => {
    const expirationDate = screen.getByText(/Expiration Date/i)
    expect(expirationDate).toBeTruthy()
  })
  test('Check that changing the expiration date input also changes the credit card expiration date', () => {
    const monthSelect = screen.getByRole('monthSelect')
    fireEvent.change(monthSelect, { target: { value: 'December' } })
    const yearSelect = screen.getByRole('yearSelect')
    fireEvent.change(yearSelect, { target: { value: '2025' } })
    const expirationDate = screen.getByText('12/25')
    expect(expirationDate).toBeTruthy()
  })
  // type card
  test('Check that clicking the type of card icon to visa also changes the credit card type of card', () => {
    const faCcVisa = screen.getByRole('faCcVisa')
    fireEvent.click(faCcVisa)
    const typeCard = screen.getByPlaceholderText('visa')
    expect(typeCard).toBeTruthy()
  })
  test('Check that clicking the type of card icon to paypal also changes the credit card type of card', () => {
    const faCcPaypal = screen.getByRole('faCcPaypal')
    fireEvent.click(faCcPaypal)
    const typeCard = screen.getByPlaceholderText('paypal')
    expect(typeCard).toBeTruthy()
  })
  test('Check that clicking the type of card icon to master card also changes the credit card type of card', () => {
    const faCcMastercard = screen.getByRole('faCcMastercard')
    fireEvent.click(faCcMastercard)
    const typeCard = screen.getByPlaceholderText('master card')
    expect(typeCard).toBeTruthy()
  })
  // email
  test('Check that the email title exists', () => {
    const email = screen.getByText(/Email/i)
    expect(email).toBeTruthy()
  })
  test('Check that changing the email input also changes the credit card email', () => {
    const emailInput = screen.getByRole('emailInput')
    expect(emailInput).toBeTruthy()
  })
  // confirm button, error messages
  test('Check that clicking the confirm without adding any space will show messages of incomplete content to continue', () => {
    const confirmBtn = screen.getByText(/Confirm/i)
    fireEvent.click(confirmBtn)
    const errorMsgs = screen.getAllByText('* incomplete')
    expect(errorMsgs).toBeTruthy()
    expect(errorMsgs.length).toBe(3)
  })
  test('Check introducing invalid values in owner, card number, cvv and email shows error messages', () => {
    const ownerInput = screen.getByPlaceholderText(/Insert Name/i)
    const cardNumberInput = screen.getByPlaceholderText('0000 0000 0000 0000')
    const cvvInput = screen.getByPlaceholderText('000')
    const emailInput = screen.getByRole('emailInput')
    const confirmBtn = screen.getByText(/Confirm/i)
    fireEvent.change(ownerInput, { target: { value: 123 } })
    fireEvent.change(cardNumberInput, {
      target: { value: 'This text should be numbers' }
    })
    fireEvent.change(cvvInput, { target: { value: 'abc' } })
    fireEvent.change(emailInput, { target: { value: 'badformat' } })
    fireEvent.click(confirmBtn)
    const numbersOnly = screen.getAllByText('* numbers only')
    const lettersOnly = screen.getAllByText('* letters only')
    const badEmailFormat = screen.getAllByText('* bad email format')
    expect(numbersOnly).toBeTruthy()
    expect(numbersOnly.length).toBe(2)
    expect(lettersOnly).toBeTruthy()
    expect(lettersOnly.length).toBe(1)
    expect(badEmailFormat).toBeTruthy()
    expect(badEmailFormat.length).toBe(1)
  })
})
