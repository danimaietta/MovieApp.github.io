import React from 'react'
import queryString from 'query-string'

export default function Seating() {
    const [prueba, setPrueba] = React.useState(100)
    function getData(){
        setPrueba(prueba + 1)
        //const movie = queryString.parse(this.props.location.search)
        //const movie = this.props.match.params.movie
        //console.log('movie', this.props.match)
        //const { movie } = props.location.state
       // console.log('movie', movie)
    }
    return (
        <div>
            <h3>{prueba}</h3>
            <button onClick={() => getData()}>Sumar 1</button>
        </div> 
    )
}