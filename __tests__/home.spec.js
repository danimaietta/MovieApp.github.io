import React, { act } from 'react'
import LocaleContext from '../app/context/LocaleContext'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ReactTestUtils from 'react-dom/test-utils' // ES6
import Home from '../app/components/Movies/Home'
require('jest-fetch-mock').enableMocks()

jest.mock('jest-fetch-mock')

const theme = 'dark'

afterEach(cleanup)

describe('Cards', () => {
  test('Onclick a card', () => {
    const { queryByTestId } = act(() => {
      render(
        <LocaleContext.Provider value={{ theme }}>
          <Home />
        </LocaleContext.Provider>
      )
    })
    console.log('------------------------' + queryByTestId('id0'))
    fireEvent.click(queryByTestId('id0'))
  })
})
