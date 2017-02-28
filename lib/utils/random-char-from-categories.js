const randomFromArray = require('./random-from-array')
const randomByCats = {
    chinese: require('./random-chinese'),
    japanese: require('./random-japanese'),
    letter: require('./random-letter'),
    number: require('./random-number'),
    special: require('./random-special'),
}

module.exports = (cats) => {
    const cat = randomFromArray(cats)
    return randomByCats[cat]()
}
