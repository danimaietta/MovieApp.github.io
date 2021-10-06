import React from 'react'
import SeatingFooter from '../app/components/Seating/SeatingFooter'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const idMovie = 1
const movie = 'Karate Kid'
const seatCount = 2
const seatNames = ['A1', 'A2']
const selectSeatsByHour = jest.fn()
const goToPayment = jest.fn()
const validateMsg = 'mensaje de prueba'

const seatingFooter = () => {
  render(
    <Router>
      <SeatingFooter
        idMovie={idMovie}
        movie={movie}
        seatCount={seatCount}
        seatNames={seatNames}
        selectSeatsByHour={selectSeatsByHour}
        goToPayment={goToPayment}
        validateMsg={validateMsg}
      />
    </Router>
  )
}

afterEach(cleanup)
beforeEach(seatingFooter)

const date = [new Date().getMonth() + 1, new Date().getDate()]
const getDateFormat = () => {
  const month = date[0] < 10 ? `0${date[0]}` : date[0]
  const day = date[1] < 10 ? `0${date[1]}` : date[1]
  return `${day} / ${month}`
}

describe('Seating Footer', () => {
  test('Check if it displays todays date', () => {
    const date = screen.getByText(`Date: ${getDateFormat()}`)
    expect(date).toBeTruthy()
  })
  test('Check if the default hour in the select date is 2:00pm', () => {
    const hourSelect = screen.getByRole('hourSelect')
    expect(hourSelect[0].selected).toBeTruthy()
    expect(hourSelect[1].selected).toBeFalsy()
    expect(hourSelect[2].selected).toBeFalsy()
  })
  test('When changing the select of hours value, selectSeatsByHour should be called', () => {
    const hourSelect = screen.getByRole('hourSelect')
    fireEvent.change(hourSelect, { target: { value: '9:00pm' } })
    expect(selectSeatsByHour).toHaveBeenCalledTimes(1)
  })
  test('Check changing the select of hours value is correct', () => {
    const hourSelect = screen.getByRole('hourSelect')
    fireEvent.change(hourSelect, { target: { value: '5:30pm' } })
    expect(hourSelect[0].selected).toBeFalsy()
    expect(hourSelect[1].selected).toBeTruthy()
    expect(hourSelect[2].selected).toBeFalsy()
  })
  test('Check if Seats: A1 A2 is displayed', () => {
    const seats = screen.getByText(/Seats: A2 A1/i)
    expect(seats).toBeTruthy()
  })
  test('Check if the price is $26', () => {
    const price = screen.getByText('Price: $26')
    expect(price).toBeTruthy()
  })
  test('Check if goToPayment is called when Payment button is clicked', () => {
    const paymentBtn = screen.getByText(/Payment/i)
    fireEvent.click(paymentBtn)
    expect(goToPayment).toHaveBeenCalledTimes(1)
  })
  test('Check that the validateMsg', () => {
    const msg = screen.getByText(/mensaje de prueba/i)
    expect(msg).toBeTruthy()
  })
})

//
