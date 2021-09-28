import React, { useRef } from 'react'
import SearchBox from '../app/components/Movies/SearchBox'
import LocaleContext from '../app/context/LocaleContext'
import { screen } from '@testing-library/dom'
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react'
const puppeteer = require('puppeteer')

const theme = 'dark'

const handleClick = jest.fn()

const searchBox = () => {
  render(
    <LocaleContext.Provider value={{ theme }}>
      <SearchBox movies={[]} handler={handleClick} />
    </LocaleContext.Provider>
  )
}

afterEach(cleanup)
beforeEach(searchBox)

describe('Filter functions', () => {
  test('Check if Most Popular filter button exists', () => {
    expect(screen.getByText(/most popular/i)).toBeDefined()
  })
  test('Check if Most Popular filter button works', () => {
    fireEvent.click(screen.getByText(/most popular/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  test('Check if Most Voted filter button exists', () => {
    expect(screen.getByText(/most voted/i)).toBeDefined()
  })
  test('Check if Most Voted filter button works', () => {
    fireEvent.click(screen.getByText(/most voted/i))
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
  test('Check if Adults Only filter button exists', () => {
    expect(screen.getByText(/adults only/i)).toBeDefined()
  })
  test('Check if Adults Only filter button works', () => {
    fireEvent.click(screen.getByText(/adults only/i))
    expect(handleClick).toHaveBeenCalledTimes(3)
  })
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
