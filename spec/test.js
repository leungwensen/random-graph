const randomGraph = require('../lib/index')

function prettify(obj) {
    return JSON.stringify(obj, null, 2)
}

console.log(prettify(randomGraph.randomTree({
    size: 10,
    attributes: {
        id: {
            type: 'uuid',
        },
        name: {
            type: 'randomString',
            options: {
                maxLength: 10,
                categories: [
                    'japanese'
                ]
            }
        }
    }
})))
