import React, { memo } from 'react'
import { BsFillCaretLeftFill } from 'react-icons/bs'

function BackButton({ history }) {
  return (
    <BsFillCaretLeftFill
      role='bckbtn'
      className='backbutton'
      onClick={history.goBack}
      size={'2em'}
    />
  )
}

export default memo(BackButton)
