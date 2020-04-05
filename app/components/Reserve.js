import React from 'react'
import SearchBox from './SearchBox'
import Card from './Card'
import { getAllMovies } from '../utils/api'
import { Link } from 'react-router-dom';

export default class Reserve extends React.Component {
    state = {
        allMovies: [],
        filterMovies: []
    }
    componentDidMount(){
        getAllMovies().then((movies) => {
            this.setState({
                allMovies: movies,
                filterMovies: movies
            })
          })       
    }
    handleChange(movies){
        this.setState({
            filterMovies: movies
        })
    }
    render() {
        let { allMovies, filterMovies } = this.state
        return (
            <div>
                <SearchBox movies={allMovies} handler={(allMovies) => this.handleChange(allMovies)} />
                <ul className='reserve-container'>
                    {filterMovies.map((movie, i) => {
                        return (
                            <Link 
                                key={i} 
                                to={{
                                    pathname: `/seating/${movie.title}`,
                                    state: {
                                        movie: movie
                                    }
                                }}
                            >                                 
                                <Card
                                    title={movie.title}
                                    poster={movie.poster_path}                            
                                />
                            </Link>
                        )
                    })}
                </ul>
                <div className='not-found-message'>
                    {(filterMovies.length === 0) && 
                        <h2>Not movies found</h2>
                    }
                </div>
            </div>
        )
    }
}