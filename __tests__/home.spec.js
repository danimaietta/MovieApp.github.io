import React from 'react'
import LocaleContext from '../app/context/LocaleContext'
import { screen, fireEvent, getRoles, getByTestId } from '@testing-library/dom'
import { render, cleanup, prettyDOM } from '@testing-library/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../app/components/Movies/Home'
import Loading from '../app/components/Movies/Loading'
require('jest-fetch-mock').enableMocks()

jest.mock('jest-fetch-mock')

const theme = 'dark'

const MockHome = () => {
  return (
    <LocaleContext.Provider value={{ theme }}>
      <Home />
    </LocaleContext.Provider>
  )
}

afterEach(cleanup)

xdescribe('Home', () => {
  test('Some home function', () => {
    render(<MockHome />)
    // you have to use getAllByText when the text is inside multiple divs
    //const dom = screen.getAllByText(/Not movies found/i)
    //console.log('DOM ' + screen.debug())
    //constexpect.anything(dom)
  })
})
