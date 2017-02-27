const randomFromArray = require('./random-from-array')

const specialChars = '!$%^&*()_+|~-=`{}[]:;<>?,./'.split('')

module.exports = () => randomFromArray(specialChars)
