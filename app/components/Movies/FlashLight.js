import React, { useContext, memo } from 'react'
import LocaleContext from '../../context/LocaleContext'

function FlashLight() {
  const { theme, setTheme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <button className={`switchBtn ${classBtn}`} onClick={toggleTheme}>
      {theme == 'light' ? '🔦' : '💡'}
    </button>
  )
}

export default memo(FlashLight)
