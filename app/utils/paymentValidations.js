export const validateCardNumber = (cardNumber = '') => {
  const cardNumberTrim = cardNumber.replace(/\s/g, '')
  const isNumber = !isNaN(cardNumberTrim)
  if (!isNumber) {
    return '* numbers only'
  } else if (cardNumber.length < 19) {
    return `* incomplete`
  } else {
    return null
  }
}

export const validateOwner = (owner = '') => {
  if (owner && /\d/.exec(owner)) {
    return '* text only'
  } else if (owner.length < 14) {
    return `* incomplete`
  } else {
    return null
  }
}

export const validateCVV = (cvv = '') => {
  if (cvv && isNaN(cvv)) {
    return '* numbers only'
  } else if (cvv.length < 3) {
    return `* incomplete`
  } else {
    return null
  }
}
