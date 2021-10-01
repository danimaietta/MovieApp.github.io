import React from 'react'
import Seating from '../app/components/Seating/Seating'
import SeatingHeader from '../app/components/Seating/SeatingHeader'
import SeatingFooter from '../app/components/Seating/SeatingFooter'
import LocaleContext from '../app/context/LocaleContext'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import JSONSeats from '../app/utils/seating.json'

const seating = () => {
  // Seating
  const theme = 'dark'
  const getJSONSeats = jest.fn((hour, id) => JSONSeats)

  // SeatingHeader
  const movie = 'Karate kid'

  // SeatingFooter
  const idMovie = 1
  const seatCount = 0
  const seatNames = []
  const selectSeatsByHour = jest.fn()
  const goToPayment = jest.fn()
  const validateMsg = ''

  render(
    <Router>
      <LocaleContext.Provider value={{ theme, getJSONSeats }}>
        <Seating match={{}} history={{}}>
          <SeatingHeader movie={movie} theme={theme} />
          <SeatingFooter
            idMovie={idMovie}
            movie={movie}
            seatCount={seatCount}
            seatNames={seatNames}
            selectSeatsByHour={selectSeatsByHour}
            goToPayment={goToPayment}
            validateMsg={validateMsg}
          />
        </Seating>
      </LocaleContext.Provider>
    </Router>
  )
}

afterEach(cleanup)
beforeEach(seating)

describe('Seating', () => {
  test('Check seatsContainer exists', () => {
    const seatsContainer = screen.getByRole('seatsContainer')
    expect(seatsContainer).toBeTruthy()
  })
  test('The second seat should contain the class freeDark', () => {
    const seat1 = screen.getByRole('seat1')
    expect(seat1.getAttribute('class')).toBe('freeDark')
  })
  test('Clicking second seat should change the class to selected', () => {
    const seat1 = screen.getByRole('seat1')
    fireEvent.click(seat1)
    expect(seat1.getAttribute('class')).toBe('selected')
  })
})
