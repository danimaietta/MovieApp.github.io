function generateSeats() {
  let seats = []
  for (let i = 0; i < 20; i++) {
    seats[i] = Math.random() < 0.5
  }
  return seats
}

const generateSeatsJSON = movies => {
  let jsonList = movies.map(movie => {
    return {
      movie,
      seats: generateSeats()
    }
  })
  return jsonList
}

export default generateSeatsJSON
