import React from 'react'
import { BsFillCaretLeftFill } from 'react-icons/bs'

export default function BackButton({ history }) {
  return (
    <BsFillCaretLeftFill
      className='backbutton'
      onClick={history.goBack}
      size={'2em'}
    />
  )
}
