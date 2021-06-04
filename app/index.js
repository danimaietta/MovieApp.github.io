import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Reserve from './components/Movies/Reserve'
import Seating from './components/Seating/Seating'
import Payment from './components/Payment/Payment'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LocaleContext from './context/LocaleContext'

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <LocaleContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Reserve} />
            <Route exact path='/seating/:id:movie' component={Seating} />
            <Route
              exact
              path='/payment/:movie:price:seats:date:hour'
              component={Payment}
            />
            <Route
              render={() => <h1 className='flex center row'>404 Not Found</h1>}
            />
          </Switch>
        </Router>
      </div>
    </LocaleContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
