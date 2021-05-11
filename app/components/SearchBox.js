import React, { useContext } from 'react'
import FlashLight from '../components/FlashLight'
import LocaleContext from '../context/LocaleContext'

export default function SearchBox({ movies, handler }) {
  const { theme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'

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

  const updateHandler = sortBy => handler(sortBy)

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
    console.log('here')
    updateHandler(movies.filter((movie, i) => !movie.adult && movie))
  }

  return (
    <div className='flex center y-center row'>
      <input
        className={`${classBtn} search-input fontawesome`}
        placeholder='&#xf002; Find a movie'
        type='text'
        onChange={handleChange}
      />
      <button
        onClick={filterByPopularity}
        className={`filter-button ${classBtn}`}
      >
        Most Popular
      </button>
      <button onClick={filterByVoted} className={`filter-button ${classBtn}`}>
        Most Voted
      </button>
      <button onClick={filterByAdults} className={`filter-button ${classBtn}`}>
        Adults Only
      </button>
      <button onClick={filterByKids} className={`filter-button ${classBtn}`}>
        Kids
      </button>
      <FlashLight />
    </div>
  )
}
