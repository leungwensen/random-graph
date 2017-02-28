const randomCharFromCats = require('./random-char-from-categories')

const DEFAULT_OPTIONS = {
    length: 6,
    capitalization: 'lowercase', // lowercase, uppercase
    categories: [
        // number,
        letter, // default
        // special,
        // chinese,
        // japanese,
    ]
}

module.exports = (customizedOptions) => {
    const options = Object.assign({}, DEFAULT_OPTIONS, customizedOptions)
    let res = ''
    for (let i = 0; i < options.length; i ++) {
        res += randomCharFromCats(options.categories)
    }
    if (options.capitalization === 'uppercase') {
        res = res.toUpperCase()
    }
    return res
}