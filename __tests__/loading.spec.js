import React from 'react'
import Loading from '../app/components/Movies/Loading'
import LocaleContext from '../app/context/LocaleContext'
import {
  render,
  screen,
  fireEvent,
  queryByTestId,
  queryByPlaceholderText
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const theme = 'dark'

describe('Loading', () => {
  test('Check if displays Loading... message ', () => {
    const { getByText } = render(
      <LocaleContext.Provider value={{ theme }}>
        <Loading />
      </LocaleContext.Provider>
    )
    expect(getByText('Loading...')).toBeInTheDocument()
  })
  test('Check if displays Loading... message ', () => {
    const { container } = render(
      <LocaleContext.Provider value={{ theme }}>
        <Loading />
      </LocaleContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot(`
    <div
       class=" container95 flex y-center center"
     >
       <h2
         class="dark-button"
       >
         Loading...
       </h2>
     </div>
    `)
  })
})
