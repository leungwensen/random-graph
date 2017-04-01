(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.randomGraph = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const utils = require('../utils/index')

function generateRoot(options) {
    const root = {
        children: []
    }
    const attributes = options.attributes
    for (let key in attributes) {
        root[key] = utils[attributes[key].type](attributes[key].options)
    }
    return root
}

function generateNode(root, child) {
    const rand = utils.randomInt(root.children.length)
    if (rand === root.children.length) {
        root.children.push(child)
    } else {
        generateNode(root.children[rand], child)
    }
}

const DEFAULT_OPTIONS = {
    size: 10,
    attributes: {
        id: {
            type: 'uuid'
        },
        name: {
            type: 'randomString',
            options: {
                maxLength: 10,
            }
        }
    }
}

function randomTree(customizedOptions) {
    const options = Object.assign({}, DEFAULT_OPTIONS, customizedOptions)
    const root = generateRoot(options)
    const size = options.size
    if (size < 1) {
        throw new Error('tree size must be larger than 1')
    }
    for (let i = 0; i < options.size - 1; i++) {
        generateNode(root, generateRoot(options))
    }
    return root
}

module.exports = randomTree

},{"../utils/index":3}],2:[function(require,module,exports){
const randomTree = require('./graphs/random-tree')
const utils = require('./utils/index')

const res = Object.assign({
    randomTree,
}, utils)

module.exports = res

},{"./graphs/random-tree":1,"./utils/index":3}],3:[function(require,module,exports){
module.exports = {
    randomCharFromCategories: require('./random-char-from-categories'),
    randomChinese: require('./random-chinese'),
    randomFromArray: require('./random-from-array'),
    randomFromRange: require('./random-from-range'),
    randomInt: require('./random-int'),
    randomJapanese: require('./random-japanese'),
    randomLetter: require('./random-letter'),
    randomNumber: require('./random-number'),
    randomSpecial: require('./random-special'),
    randomString: require('./random-string'),
    uuid: require('./uuid'),
}

},{"./random-char-from-categories":4,"./random-chinese":5,"./random-from-array":6,"./random-from-range":7,"./random-int":8,"./random-japanese":9,"./random-letter":10,"./random-number":11,"./random-special":12,"./random-string":13,"./uuid":14}],4:[function(require,module,exports){
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

},{"./random-chinese":5,"./random-from-array":6,"./random-japanese":9,"./random-letter":10,"./random-number":11,"./random-special":12}],5:[function(require,module,exports){
const randomFromRange = require('./random-from-range')

const range = {
    start: 0x4E00,
    end: 0x9FA5
}

module.exports = () => String.fromCharCode(randomFromRange(range.start, range.end))

},{"./random-from-range":7}],6:[function(require,module,exports){
const randomInt = require('./random-int')

module.exports = arr => {
    if (!Array.isArray(arr) || !arr.length) {
        return null
    }
    return arr[randomInt(arr.length - 1)]
}

},{"./random-int":8}],7:[function(require,module,exports){
const randomInt = require('./random-int')

module.exports = (start, end) => start + randomInt(end - start)

},{"./random-int":8}],8:[function(require,module,exports){
module.exports = (n) => Math.round(Math.random() * n)

},{}],9:[function(require,module,exports){
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

},{"./random-from-array":6,"./random-from-range":7}],10:[function(require,module,exports){

const randomFromArray = require('./random-from-array')

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

module.exports = () => randomFromArray(letters)

},{"./random-from-array":6}],11:[function(require,module,exports){
const randomFromArray = require('./random-from-array')

const numbers = '0123456789'.split('')

module.exports = () => randomFromArray(numbers)

},{"./random-from-array":6}],12:[function(require,module,exports){
const randomFromArray = require('./random-from-array')

const specialChars = '!$%^&*()_+|~-=`{}[]:;<>?,./'.split('')

module.exports = () => randomFromArray(specialChars)

},{"./random-from-array":6}],13:[function(require,module,exports){
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
},{"./random-char-from-categories":4,"./random-from-range":7}],14:[function(require,module,exports){
module.exports = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random()*16|0
    const v = c === 'x' ? r : (r&0x3|0x8)
    return v.toString(16)
})

},{}]},{},[2])(2)
});