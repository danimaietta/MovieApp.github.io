const APIUrl = 'https://api.themoviedb.org'
const APIKey = 'e5bde210ebc7f2df4b8025396b155270'

export function getAllMovies() {
  return fetch(`${APIUrl}/3/discover/movie?api_key=${APIKey}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.results)
      return data.results
    })
    .catch(error => console.log('getAllMovies', error))
}
