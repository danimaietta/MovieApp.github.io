import React from 'react'
import Proptypes from 'prop-types'

export default class Card extends React.Component {
  render() {
    return (
        <div className='card'>
            <h4>{this.props.title}</h4>
            <img 
                src={`https://www.cinecalidad.page/movies/static/img/w500${this.props.poster}`}
                alt='not found'
            />
        </div> 
    )
  }
}
