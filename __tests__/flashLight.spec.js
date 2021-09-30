import React, { useContext } from 'react'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import FlashLight from '../app/components/Movies/FlashLight'
import LocaleContext from '../app/context/LocaleContext'

const setTheme = jest.fn()

function flashLight(theme) {
  render(
    <LocaleContext.Provider value={{ theme, setTheme }}>
      <FlashLight />
    </LocaleContext.Provider>
  )
}

afterEach(cleanup)

describe('Flash Light', () => {
  test('Check if theme is dark then display 💡', () => {
    flashLight('dark')
    expect(screen.getByText(/💡/i)).toBeTruthy()
  })
  test('Check if theme is light then display 🔦', () => {
    flashLight('light')
    expect(screen.getByText(/🔦/i)).toBeTruthy()
  })
  test('Check if clicking the button it toggles to dark again', () => {
    flashLight('light')
    fireEvent.click(screen.getByText(/🔦/i))
    expect(setTheme).toHaveBeenCalledTimes(1)
  })
})
