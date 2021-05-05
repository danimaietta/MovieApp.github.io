import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBox({ movies, handler }) {
  function filterMoviesByTitle(movieTitle) {
    return movies.filter((movie, i) => {
      if (movie.title.toLowerCase().includes(movieTitle.toLowerCase()))
        return movie
    })
  }
  const handleChange = event => {
    let filteredMovies = filterMoviesByTitle(event.target.value)
    handler(filteredMovies)
  }
  const updateHandler = sortBy => {
    handler(sortBy)
  }
  const filterByPopularity = () => {
    updateHandler(movies.sort((a, b) => b.popularity - a.popularity))
  }
  const filterByVoted = () => {
    updateHandler(movies.sort((a, b) => b.vote_count - a.vote_count))
  }
  const filterByAdults = () => {
    updateHandler(movies.filter((movie, i) => movie.adult && movie))
  }
  const filterByKids = () => {
    updateHandler(movies.filter((movie, i) => !movie.adult && movie))
  }
  return (
    <div className='flex center row'>
      <input
        className='search-input fontawesome'
        placeholder='&#xf002; Find a movie'
        type='text'
        onChange={handleChange}
      ></input>
      <button onClick={filterByPopularity} className={`filter-button`}>
        Most Popular
      </button>
      <button onClick={filterByVoted} className='filter-button'>
        Most Voted
      </button>
      <button onClick={filterByAdults} className='filter-button'>
        Adults Only
      </button>
      <button onClick={filterByKids} className='filter-button'>
        Kids
      </button>
    </div>
  )
}
