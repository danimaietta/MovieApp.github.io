import React, { useRef } from 'react'
import SearchBox from '../app/components/Movies/SearchBox'
import LocaleContext from '../app/context/LocaleContext'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'
const puppeteer = require('puppeteer')

const theme = 'dark'

const searchBox = () => {
  render(
    <LocaleContext.Provider value={{ theme }}>
      <SearchBox movies={[]} handler={jest.fn()} />
    </LocaleContext.Provider>
  )
}

afterEach(cleanup)
beforeEach(searchBox)

describe('Filter functions', () => {
  test('Check if Most Popular filter button exists', () => {
    const mp = screen.getByText(/most popular/i)
    expect(mp).toBeDefined()
  })
  test('Check if Most Popular filter button works', () => {
    const filterByPopularity = jest.fn()
    const mp = screen.getByText(/most popular/i)
    console.log('--- mp ' + prettyDOM(mp))
    fireEvent.click(mp)
    expect(filterByPopularity).toHaveBeenCalledTimes(1)
  })
  /* test('should find movies with the letter A in it', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage()
    await page.goto('https://danimaietta.github.io/MovieApp')
    await page.click('input.searchInput')
    await page.type('input.searchInput', 'AA')
    //await page.waitForNavigation()
    //browser.close()
  })*/
})
