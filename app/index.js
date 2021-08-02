import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Reserve from './components/Movies/Reserve'
import Seating from './components/Seating/Seating'
import Payment from './components/Payment/Payment'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LocaleContext from './context/LocaleContext'
import JSONSeats from './utils/seating.json'

function App() {
  localStorage.setItem('hour', '2:00pm')
  const [theme, setTheme] = useState('dark')

  const getJSONSeats = (hour = '2:00pm', idMovie) => {
    return JSONSeats.filter(jsonS => jsonS.id == idMovie && jsonS.hour == hour)[0].seats
  }

  return (
    <LocaleContext.Provider value={{ theme, setTheme, getJSONSeats }}>
      <div className={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Reserve} />
            <Route exact path='/seating/:id:movie' component={Seating} />
            <Route
              exact
              path='/payment/:idMovie:movie:price:seatNames:date:hour'
              component={Payment}
            />
            <Route
              render={() => (
                <div className='container95 align-center'>
                  <h1 className=' margin0'>404 Not Found</h1>
                  Click
                  <a className='blue' onClick={() => window.location.replace('./')}>
                    {' '}
                    here{' '}
                  </a>
                  to return to the homepage
                </div>
              )}
            />
          </Switch>
        </Router>
        <Footer />
      </div>
    </LocaleContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
