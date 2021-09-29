import React from 'react'
import { screen } from '@testing-library/dom'
import { render, cleanup, prettyDOM } from '@testing-library/react'
import FlashLight from '../app/components/Movies/FlashLight'
import LocaleContext from '../app/context/LocaleContext'

afterEach(cleanup)

describe('Flash Light', () => {
  test('Check if theme is dark then display 💡', () => {
    const theme = 'dark'
    render(
      <LocaleContext.Provider value={{ theme }}>
        <FlashLight />
      </LocaleContext.Provider>
    )
    expect(screen.getByText(/💡/i)).toBeTruthy()
  })
  test('Check if theme is light then display 🔦', () => {
    const theme = 'light'
    render(
      <LocaleContext.Provider value={{ theme }}>
        <FlashLight />
      </LocaleContext.Provider>
    )
    expect(screen.getByText(/🔦/i)).toBeTruthy()
  })
})
