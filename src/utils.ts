/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe =
    (...fns: Array<(v: any) => any>) =>
    (value: any) =>
        fns.reduce((acc, fn) => fn(acc), value)

let last: string | undefined

export const peek = (arr: string[]) => arr[1]

export const hindsight = () => last

export const pop = (arr: string[]) => {
    last = arr.shift()
}

export const getLeafNode = (node: {
    children?: Record<string, unknown>[]
}): Record<string, unknown> => {
    while (node.children?.length) {
        node.children.forEach(ch => {
            if (ch.type === 'List') {
                getLeafNode(ch)
                node = ch
            } else {
                getLeafNode(ch)
                node = ch
            }
        })
    }
    console.log('==> N', node)
    return node
}

export function getLeafNodes(rootNode) {
    let last = null
    function traverse(acc, node) {
        if (node.children) {
            last = node
            return node.children.reduce(traverse, acc)
        } else {
            return last
        }

        acc.push(node)
        return acc
    }

    return traverse([], rootNode)
}

export function populateChildren(node: any) {
    if (!node.children) return node

    return node.children.map((c: any) => {
        if (c.type === 'Text') {
            return `<li>${c.value}</li>`
        }
    })
}
