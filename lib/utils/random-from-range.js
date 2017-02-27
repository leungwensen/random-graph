const randomInt = require('./random-int')

module.exports = (start, end) => start + randomInt(end - start)
