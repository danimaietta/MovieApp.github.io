import React from 'react'
import BackButton from '../BackButton'

export default function Payment(props) {
  return (
    <div>
      <BackButton history={props.history} />
      <h1>payment component</h1>
    </div>
  )
}
