import React from 'react'
import { FaSearch } from 'react-icons/fa';

export default class SearchBox extends React.Component {
  filterMoviesByTitle(movieTitle) {
    return this.props.movies.filter((movie, i) => {
      if(movie.title.toLowerCase().includes(movieTitle.toLowerCase())) return movie
    })
  }
  handleChange = (event) => {
    let filteredMovies = this.filterMoviesByTitle(event.target.value)
    this.props.handler(filteredMovies)
  }
  filterByPopularity = () => {
    let sortByPopular = this.props.movies.sort((a, b) => b.popularity - a.popularity)
    this.props.handler(sortByPopular)
  }
  filterByVoted = () => {
    let sortByVoted = this.props.movies.sort((a, b) => b.vote_count - a.vote_count)
    this.props.handler(sortByVoted)
  }
  filterByAdults = () => {
    let sortByAdults = this.props.movies.filter((movie, i) => movie.adult && movie)
    this.props.handler(sortByAdults)
  }
  filterByKids = () => {
    let sortByKids = this.props.movies.filter((movie, i) => !movie.adult && movie)
    this.props.handler(sortByKids)
  }
  render() {
    return (
      <div className='flex center row'>
        <input
            className='search-input fontawesome'
            placeholder='&#xf002; Find a movie'
            type='text'
            onChange={this.handleChange}
        >
        </input>
        <button
          onClick={() => this.filterByPopularity()}
          className={`filter-button`}
        >
         Most Popular
        </button>
        <button
          onClick={() => this.filterByVoted()}
          className='filter-button'
        >
          Most Voted
        </button>
        <button
          onClick={() => this.filterByAdults()}
          className='filter-button'
        >
          Adults Only
        </button>
        <button
          onClick={() => this.filterByKids()}
          className='filter-button'
        >
          Kids
        </button>
      </div>    
    )
  }
}