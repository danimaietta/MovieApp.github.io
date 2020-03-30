import React from 'react'
import queryString from 'query-string'

export default class Seating extends React.Component {
    getData(){
        //const movie = queryString.parse(this.props.location.search)
        const movie = this.props.match.params.movie
        console.log('movie', this.props.match)
    }
    render() {
        this.getData()
        return (
            <div>
                <h3>Hello {this.props.match.params.movie}</h3>
            </div> 
        )
    }
}