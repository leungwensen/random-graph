const randomGraph = require('../lib/index')

function prettify(obj) {
    return JSON.stringify(obj, null, 2)
}

const tree = randomGraph.randomTree({
    size: 100,
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
})

function treeCount(root) {
    const arr = [root]
    let count = 0
    let currentNode;
    while (currentNode = arr.pop()) {
        count += 1;
        (currentNode.children || []).forEach(node => {
            arr.push(node)
        })
    }
    return count
}

console.log(prettify(tree), treeCount(tree))
