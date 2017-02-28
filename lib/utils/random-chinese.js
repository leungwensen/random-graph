const randomFromRange = require('./random-from-range')

const range = {
    start: 0x4E00,
    end: 0x9FA5
}

module.exports = () => String.fromCharCode(randomFromRange(range.start, range.end))
