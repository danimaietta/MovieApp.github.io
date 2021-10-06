import React from 'react'
import Footer from '../app/components/Footer/Footer'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'

const footer = () => {
  window.open = jest.fn()
  render(<Footer />)
}

afterEach(cleanup)
beforeEach(footer)

describe('Footer', () => {
  test('Check that author: Dev. Daniel Maietta exists', () => {
    expect(screen.getByText(/Dev. Daniel Maietta/i)).toBeTruthy()
  })
  test('When portfolio icon is clicked it should call window.open: ', () => {
    const portfolio = screen.getByRole('portfolio')
    fireEvent.click(portfolio)
    expect(window.open).toHaveBeenCalledWith('https://danimaietta.github.io/portfolio/')
  })
  test('When git icon is clicked it should call window.open: ', () => {
    const git = screen.getByRole('git')
    fireEvent.click(git)
    expect(window.open).toHaveBeenCalledWith('https://github.com/danimaietta')
  })
  test('When linkedin icon is clicked it should call window.open: ', () => {
    const linkedin = screen.getByRole('linkedin')
    fireEvent.click(linkedin)
    expect(window.open).toHaveBeenCalledWith(
      'https://www.linkedin.com/in/dani-maietta-4680a51b1/'
    )
  })
})
