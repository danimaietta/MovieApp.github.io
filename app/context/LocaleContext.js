import React from 'react'

const LocaleContext = React.createContext({
  theme: 'light',
  setTheme: () => (theme === 'light' ? 'dark' : 'light')
})

export default LocaleContext
