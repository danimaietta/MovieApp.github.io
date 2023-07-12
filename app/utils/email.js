import { send, init } from 'emailjs-com'
import { months } from './utils'

init('4HX0iPm0LYD5HmS-h')
const sendEmail = ({ movie, price, seatNames, date, hour, email }) => {
  return send(
    'service_wyzwz33',
    'template_wjrhujl',
    {
      movie,
      price,
      seatNames: seatNames.toString(),
      day: date[1],
      hour,
      month: months[date[0]],
      email,
      code: `${seatNames.toString()} - ${Math.random() * 10}`
    },
    '4HX0iPm0LYD5HmS-h'
  )
}

export default sendEmail
