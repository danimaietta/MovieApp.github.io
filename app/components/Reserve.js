import React, { useState, useEffect } from 'react'
import SearchBox from './SearchBox'
import Card from './Card'
import { getAllMovies } from '../utils/api'
import { Link } from 'react-router-dom'

export default function Reserve() {
  const [allMovies, setAllMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([])

  useEffect(() => {
    async function getMovies() {
      const movies = await getAllMovies()
      setAllMovies(movies)
      setFilterMovies(movies)
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
              <Card title={movie.title} poster={movie.poster_path} />
            </Link>
          )
        })}
      </ul>
      <div className='not-found-message'>
        {filterMovies.length === 0 && <h2>Not movies found</h2>}
      </div>
    </div>
  )
}
