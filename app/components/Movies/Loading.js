import React, { useContext } from 'react'
import LocaleContext from '../../context/LocaleContext'

export default function Loading() {
  const { theme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'

  console.count('Loading')

  return (
    <div className=' container95 flex y-center center'>
      <h2 className={`${classBtn}`}>Loading...</h2>
    </div>
  )
}
