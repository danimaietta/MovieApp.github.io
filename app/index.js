import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Reserve from './components/Movies/Reserve'
import Seating from './components/Seating/Seating'
import Payment from './components/Payment/Payment'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LocaleContext from './context/LocaleContext'
import JSONSeats from './utils/seating.json'

function App() {
  localStorage.setItem('hour', '2:00pm')
  const [theme, setTheme] = useState('light')

  const getSeats = (hour = '2:00pm', idMovie) => {
    return JSONSeats.filter(jsonS => jsonS.id == idMovie && jsonS.hour == hour)
  }

  return (
    <LocaleContext.Provider value={{ theme, setTheme, getSeats }}>
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
            <Route render={() => <h1 className='flex center row'>404 Not Found</h1>} />
          </Switch>
        </Router>
      </div>
    </LocaleContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
