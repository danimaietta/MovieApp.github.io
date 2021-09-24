import React from 'react'
import { screen, fireEvent, cleanup } from '@testing-library/dom'
import { render } from '@testing-library/react'
import Card from '../app/components/Movies/Card'
require('jest-fetch-mock').enableMocks()

jest.mock('jest-fetch-mock')

describe('Cards', () => {
  test('Onclick a card', () => {
    render(<Card />)
    const card = screen.getByAltText(/card not found/i)
    console.log('---- Card: ' + card)
    expect.anything(card)
  })
})
