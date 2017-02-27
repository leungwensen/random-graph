
const randomFromArray = require('./random-from-array')

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

module.exports = () => randomFromArray(letters)
