import React from 'react'
import { getAllMovies } from '../app/utils/api'
import sendEmail from '../app/utils/email'
import {
  validateCardNumber,
  validateOwner,
  validateCVV,
  validateEmail
} from '../app/utils/paymentValidations'
require('jest-fetch-mock').enableMocks()

jest.mock('jest-fetch-mock')

/*const movie = {
  adult: false,
  backdrop_path: '',
  genre_ids: [],
  id: 0,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0
}*/

describe('Utils', () => {
  test('Check that getAllMovies brings 20 results', async () => {
    const movies = await getAllMovies()
    expect(movies.length).toBe(20)
  })
  test('Check the needed properties of the movies from getAllMovies', async () => {
    const movies = await getAllMovies()
    for (let movie of movies) {
      const id = movie.hasOwnProperty('id')
      const title = movie.hasOwnProperty('title')
      const poster_path = movie.hasOwnProperty('poster_path')
      const adult = movie.hasOwnProperty('adult')
      const popularity = movie.hasOwnProperty('popularity')
      const vote_count = movie.hasOwnProperty('vote_count')
      expect(id).toBeTruthy()
      expect(title).toBeTruthy()
      expect(poster_path).toBeTruthy()
      expect(adult).toBeTruthy()
      expect(popularity).toBeTruthy()
      expect(vote_count).toBeTruthy()
    }
  })
  /*
  // This test works, it sends an email everytime we test it, that's why this is commented

    test('Check the email is sended successfully', async () => {
      const emailData = {
        movie: 'Karate Kid',
        price: '$26',
        seatNames: 'A1, A2',
        date: ['8', 'December'],
        hour: '2:00pm',
        month: 'December',
        email: 'danimaietta1@gmail.com',
        code: 'A1A2'
      }
      const email = await sendEmail(emailData)
      expect(email.status).toBe(200)
    })
  */
  test('Check that the payment validations work', () => {
    const cardNumber1 = validateCardNumber('1234 1234 1234 1234') == null ? true : false
    const cardNumber2 =
      validateCardNumber('this is not a card number') == null ? true : false
    const owner1 = validateOwner('Daniel Maietta e') == null ? true : false
    const owner2 = validateOwner('12345678') == null ? true : false
    const cvv1 = validateCVV('123') == null ? true : false
    const cvv2 = validateCVV('abc') == null ? true : false
    const email1 = validateEmail('danimaietta1@gmail.com') == null ? true : false
    const email2 = validateEmail('danimaietta1') == null ? true : false
    expect(cardNumber1).toBeTruthy()
    expect(cardNumber2).toBeFalsy()
    expect(owner1).toBeTruthy()
    expect(owner2).toBeFalsy()
    expect(cvv1).toBeTruthy()
    expect(cvv2).toBeFalsy()
    expect(email1).toBeTruthy()
    expect(email2).toBeFalsy()
  })
})
