const randomFromArray = require('./random-from-array')
const randomFromRange = require('./random-from-range')

const ranges = [
    {
        start: 0x3040,
        end: 0x309F
    },
    {
        start: 0x30A0,
        end: 0x30FF
    }
]

module.exports = () => {
    const range = randomFromArray(ranges)
    return String.fromCharCode(randomFromRange(range.start, range.end))
}
