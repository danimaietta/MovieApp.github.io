import React, { useReducer, useEffect, useContext } from 'react'
import SearchBox from './SearchBox'
import Card from './Card'
import { getAllMovies } from '../../utils/api'
import { Link } from 'react-router-dom'
import LocaleContext from '../../context/LocaleContext'
import Loading from './Loading'
//import seatsGenerator from '../../utils/seatsGenerator'

export default function Home() {
  const { theme } = useContext(LocaleContext)
  const classBtn = theme == 'light' ? 'light-button' : 'dark-button'

  function reducer(state, action) {
    if (action.type === 'firstLoad') {
      return {
        allMovies: action.movies,
        filterMovies: action.movies,
        loading: false
      }
    } else if (action.type === 'updateMovies') {
      return {
        ...state,
        filterMovies: action.movies,
        loading: false
      }
    }
  }

  const [home, dispatch] = useReducer(reducer, {
    allMovies: [],
    filterMovies: [],
    loading: true
  })

  const { allMovies, filterMovies, loading } = home

  useEffect(() => {
    let isMounted = true
    async function getMovies() {
      try {
        const movies = await getAllMovies()
        return movies.map((m, i) => ({ ...m, idMovie: i + 1 }))
      } catch (e) {
        console.log({ e })
      }
    }
    getMovies().then(movies => {
      if (isMounted) dispatch({ type: 'firstLoad', movies })
    })
    return () => {
      isMounted = false
    }
  }, [])

  if (loading === true) {
    return <Loading />
  }

  return (
    <div data-testid='home-container'>
      <SearchBox movies={allMovies} handler={dispatch} />
      {filterMovies.length === 0 ? (
        <div className=' container75 flex y-center center'>
          <h2 className={`${classBtn}`}>Not movies found</h2>
        </div>
      ) : (
        <ul className='home-container'>
          {filterMovies.map((movie, i) => {
            return (
              <Link
                key={i}
                to={{
                  pathname: `/MovieApp/seating/${movie.idMovie}${movie.title}`,
                  search: `?id=${movie.idMovie}&movie=${movie.title}`,
                  state: {
                    id: movie.idMovie,
                    movie
                  }
                }}
              >
                <Card poster={movie.poster_path} />
              </Link>
            )
          })}
        </ul>
      )}
    </div>
  )
}
