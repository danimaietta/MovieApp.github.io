import React from 'react'
import BackButton from '../app/components/BackButton'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent } from '@testing-library/react'

const history = {
  goBack: jest.fn()
}

const backButton = () => {
  render(<BackButton history={history} />)
}

afterEach(cleanup)
beforeEach(backButton)

describe('Back Button', () => {
  test('Check if when the button is clicked the history went back', () => {
    fireEvent.click(screen.getByRole(/bckbtn/i))
    expect(history.goBack).toHaveBeenCalledTimes(1)
  })
})
