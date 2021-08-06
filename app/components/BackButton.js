import React, { memo } from 'react'
import { BsFillCaretLeftFill } from 'react-icons/bs'

function BackButton({ history }) {
  console.count('BackButton')
  return (
    <BsFillCaretLeftFill className='backbutton' onClick={history.goBack} size={'2em'} />
  )
}

export default memo(BackButton)
