import React from 'react'
import SeatingHeader from '../app/components/Seating/SeatingHeader'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'

const seatingHeader = () => {
  render(<SeatingHeader movie='Karate Kid' theme='dark' />)
}

afterEach(cleanup)
beforeEach(seatingHeader)

describe('Seating Header', () => {
  test('Check if the movie Karate Kid is displayed ', () => {
    const title = screen.getByText('Karate Kid')
    expect(title).toBeTruthy()
  })
  test('The info of the seats should contain a seat with class free', () => {
    const seats = screen.getByText(/Empty/i)
    expect(seats.firstElementChild.getAttribute('class')).toBe('free')
  })
  test('The info of the seats should contain a seat with class taken', () => {
    const seats = screen.getByText(/Taken/i)
    expect(seats.getElementsByClassName('taken')[0].getAttribute('class')).toBe('taken')
  })
  test('The info of the seats should contain a seat with class selected', () => {
    const seats = screen.getByText(/Selected/i)
    expect(seats.lastElementChild.getAttribute('class')).toBe('selected')
  })
})
