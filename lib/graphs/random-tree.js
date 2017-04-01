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
