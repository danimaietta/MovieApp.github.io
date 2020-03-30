const APIUrl = 'https://api.themoviedb.org'
const APIKey = 'e5bde210ebc7f2df4b8025396b155270'
const APIToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWJkZTIxMGViYzdmMmRmNGI4MDI1Mzk2YjE1NTI3MCIsInN1YiI6IjVlNmI3ZmFjMDMxYTFkMDAxMzM4YjcxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z8RCsu496wEAwB6DuGqex1aI2eWdgwSfsyR14cLcHyU'

export function getAllMovies(){
    return fetch(`${APIUrl}/3/discover/movie?api_key=${APIKey}`)
    .then((res) => res.json())
    .then((data) => {
        //console.log(data.results)
        return data.results
    })
    .catch((error) => console.log('getAllMovies', error))
}
