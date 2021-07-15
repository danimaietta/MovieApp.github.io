import { send, init } from 'emailjs-com'
import { months } from './utils'

init('user_xGmxuVGkTxsGlfO5Nke6f')
const sendEmail = ({ movie, price, seatNames, date, hour, email }) => {
  return send(
    'service_h10tdd8',
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
    'user_xGmxuVGkTxsGlfO5Nke6f'
  )
}

export default sendEmail
