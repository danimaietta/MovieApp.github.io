import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: '#e34646'
}

export default class Nav extends React.Component {
  state = {
    theme: 'light'
  }
  toggleTheme = () => {
    console.log(`I'll do this later :)`)
  }
  render() {
    return (
      <nav className='flex row white'>
        <ul className='flex row white'>
          <li className='space-between'>
            <NavLink 
              to='/'
              exact
              activeStyle={activeStyle} 
              className='nav-link'>
                  Reserve
            </NavLink>
          </li>
        </ul>
        <div className='flex end'>
          <button
            className='light-button'
            onClick={this.toggleTheme}
          >
            {this.state.theme === 'light' ? '🔦' : '💡'}
          </button>
        </div>
      </nav>    
    )
  }
}