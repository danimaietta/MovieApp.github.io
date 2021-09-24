import React from 'react'
import LocaleContext from '../app/context/LocaleContext'
import { screen, fireEvent, getRoles, getByTestId } from '@testing-library/dom'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../app/components/Movies/Home'
import Loading from '../app/components/Movies/Loading'
require('jest-fetch-mock').enableMocks()

jest.mock('jest-fetch-mock')

const theme = 'dark'

afterEach(cleanup)

describe('Home', () => {
  /*test('Some home function', () => {
    render(
      <LocaleContext.Provider value={{ theme }}>
        <Home />
      </LocaleContext.Provider>
    )
    const element = screen.getByTestId('home-container')
    console.log('------ Element ' + element)
    //fireEvent.click(dom)
  })*/
  test('Some home function', () => {
    render(
      <LocaleContext.Provider value={{ theme }}>
        <Home />
      </LocaleContext.Provider>
    )
    // you have to use getAllByText when the text is inside multiple divs
    const dom = screen.getAllByText(() => /notFound/i)
    for (const prop in dom) {
      for (const p in prop) {
        console.log('DOM ' + p)
      }
    }
    expect.anything(dom)
  })
})
