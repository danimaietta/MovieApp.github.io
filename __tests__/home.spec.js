import React from 'react'
import LocaleContext from '../app/context/LocaleContext'
import {
  screen,
  fireEvent,
  waitFor,
  render,
  cleanup,
  prettyDOM
} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../app/components/Movies/Home'
import Loading from '../app/components/Movies/Loading'
import Card from '../app/components/Movies/Card'
import SearchBox from '../app/components/Movies/SearchBox'
import { getAllMovies } from '../app/utils/api'
require('jest-fetch-mock').enableMocks()

jest.mock('jest-fetch-mock')

const theme = 'dark'

const handleClick = jest.fn()

const home = () => {
  render(
    <Router>
      <LocaleContext.Provider value={{ theme }}>
        <Home>
          <Loading />
          <SearchBox movies={[]} handler={handleClick} />
          <Card />
        </Home>
      </LocaleContext.Provider>
    </Router>
  )
}

afterEach(cleanup)
beforeEach(home)

describe('Home', () => {
  test('At first when the home is loading should display a Loading... message', () => {
    const loading = screen.getByText('Loading...')
    expect(loading).toBeTruthy()
  })
  test('At the start it should not display the message: Not movies found', async () => {
    const searchInput = await waitFor(() => screen.getByPlaceholderText(/Find a movie/i))
    fireEvent.change(searchInput, { target: { value: 'test text 123' } })
    const notFound = await waitFor(() => screen.getByText('Not movies found'))
    expect(notFound).toBeTruthy()
  })
  test('Clicking a card redirects to a certain direction', async () => {
    const allMovies = await waitFor(() => getAllMovies())
    const movies = allMovies.map((m, i) => ({ ...m, idMovie: i + 1 }))
    const movie0 = await waitFor(() => screen.getByRole('movie0'))
    fireEvent.click(movie0)
    expect(movie0.pathname).toBe(
      `/MovieApp/seating/${movies[0].idMovie}${movies[0].title.replace(/\s/g, '%20')}`
    )
  })
})
