import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import Reserve from './components/Reserve'
import Seating from './components/Seating'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LocaleContext from './context/LocaleContext'

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <LocaleContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path='/' component={Reserve} />
            <Route exact path='/seating/:movie' component={Seating} />
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
