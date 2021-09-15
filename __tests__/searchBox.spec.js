import React, { useRef } from 'react'
import SearchBox from '../app/components/Movies/SearchBox'
import { render } from '@testing-library/react'
const puppeteer = require('puppeteer')

//const SB = jest.mock('../app/components/Movies/SearchBox').fn()

describe('Filter functions', () => {
  test('Check if filter works ', () => {
    //const sb = render(<SearchBox handler={jest.fn()} />)
    //console.log(sb)
    //expect(SB.filterByPopularity()).toBeDefined()
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
