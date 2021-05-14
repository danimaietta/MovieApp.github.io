import React, { useState, useEffect, useContext } from 'react'
import SearchBox from './SearchBox'
import Card from './Card'
import { getAllMovies } from '../../utils/api'
import { Link } from 'react-router-dom'
import LocaleContext from '../../context/LocaleContext'
import seatsGenerator from '../../utils/seatsGenerator'

export default function Reserve() {
  const [allMovies, setAllMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([])
  const { theme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'

  useEffect(() => {
    async function getMovies() {
      const movies = await getAllMovies()
      setAllMovies(movies)
      setFilterMovies(movies)
      //const allSeats = seatsGenerator(movies.map(m => m.title))
      //console.log(allSeats)
    }
    getMovies()
  }, [])

  const handleChange = movies => setFilterMovies(movies)

  return (
    <div>
      <SearchBox
        movies={allMovies}
        handler={allMovies => handleChange(allMovies)}
      />
      {filterMovies.length === 0 && (
        <h2 className={`${classBtn} not-found-message`}>Not movies found</h2>
      )}
      <ul className='reserve-container'>
        {filterMovies.map((movie, i) => {
          return (
            <Link
              key={i}
              to={{
                pathname: `/seating/${i}${movie.title}`,
                state: {
                  id: i,
                  movie
                }
              }}
            >
              <Card poster={movie.poster_path} />
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
