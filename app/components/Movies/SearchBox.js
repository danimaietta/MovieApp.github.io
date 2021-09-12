import React, { useContext, memo } from 'react'
import FlashLight from './FlashLight'
import LocaleContext from '../../context/LocaleContext'
import PropTypes from 'prop-types'

function SearchBox({ movies, handler }) {
  const { theme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'

  function filterMoviesByTitle(movieTitle) {
    return movies.filter(movie => {
      if (movie.title.toLowerCase().includes(movieTitle.toLowerCase())) return movie
    })
  }

  const handleChange = event => {
    handler({ type: 'updateMovies', movies: filterMoviesByTitle(event.target.value) })
  }

  const filterByPopularity = () => {
    handler({
      type: 'updateMovies',
      movies: movies.sort((a, b) => b.popularity - a.popularity).slice(0, 20)
    })
  }

  const filterByVoted = () => {
    handler({
      type: 'updateMovies',
      movies: movies.sort((a, b) => b.vote_count - a.vote_count).slice(0, 20)
    })
  }

  const filterByAdults = () => {
    handler({
      type: 'updateMovies',
      movies: movies.filter(movie => movie.adult && movie)
    })
  }

  console.count('SearchBox')

  return (
    <div className='flex center y-center container20'>
      <input
        id='searchBox'
        className={`${classBtn} search-input fontawesome`}
        placeholder='&#xf002; Find a movie'
        type='text'
        onChange={handleChange}
      />
      <button onClick={filterByPopularity} className={`filter-button ${classBtn}`}>
        Most Popular
      </button>
      <button onClick={filterByVoted} className={`filter-button ${classBtn}`}>
        Most Voted
      </button>
      <button onClick={filterByAdults} className={`filter-button ${classBtn}`}>
        Adults Only
      </button>
      <FlashLight />
    </div>
  )
}

export default memo(SearchBox)

SearchBox.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number,
      idMovie: PropTypes.number,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number
    })
  ),
  handler: PropTypes.func.isRequired
}
