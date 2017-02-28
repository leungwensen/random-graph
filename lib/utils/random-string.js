const randomCharFromCats = require('./random-char-from-categories')
const randomFromRange = require('./random-from-range')

const DEFAULT_OPTIONS = {
    length: 6,
    maxLength: 6,
    capitalization: 'lowercase', // lowercase, uppercase
    categories: [
        // 'number',
        'letter', // default
        // 'special',
        // 'chinese',
        // 'japanese',
    ]
}

module.exports = (customizedOptions) => {
    const options = Object.assign({}, DEFAULT_OPTIONS, customizedOptions)
    let res = ''
    const len = options.length ? options.length : randomFromRange(1, options.maxLength)
    for (let i = 0; i < len; i ++) {
        res += randomCharFromCats(options.categories)
    }
    if (options.capitalization === 'uppercase') {
        res = res.toUpperCase()
    }
    return res
}