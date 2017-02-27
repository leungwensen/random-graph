const randomInt = require('./random-int')

module.exports = arr => {
    if (!Array.isArray(arr) || !arr.length) {
        return null
    }
    return arr[randomInt(arr.length - 1)]
}
