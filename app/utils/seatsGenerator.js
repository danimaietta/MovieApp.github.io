function generateSeats() {
  let seats = []
  for (let i = 0; i < 20; i++) {
    seats[i] = Math.random() < 0.5
  }
  return seats
}

const generateSeatsJSON = movies => {
  return movies.map(movie => {
    return {
      movie,
      seats: generateSeats()
    }
  })
}

export default generateSeatsJSON
