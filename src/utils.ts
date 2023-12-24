/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Text, List } from './types'

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

// export function getLeafNodes(rootNode) {
//     let last = null
//     function traverse(acc, node) {
//         if (node.children) {
//             last = node
//             return node.children.reduce(traverse, acc)
//         } else {
//             return last
//         }

//         acc.push(node)
//         return acc
//     }

//     return traverse([], rootNode)
// }

export function populateChildren(node: any) {
    if (!node.children) return node

    return node.children.map((c: any) => {
        if (c.type === 'Text') {
            return `<li>${c.value}</li>`
        }
    })
}

export function buildListHtml(nodes: (Text | List)[]) {
    let html = ''
    const stack: (Text | List)[] = []

    console.log('==>', 10, nodes)

    nodes.forEach(_ => {
        stack.push(_)

        console.log('==>', 99, stack)

        if (_.type === 'Text') {
            const { value } = _
            const content = value.replace(
                /(\*\*|__)(?=\S)([^*_]+?)(?<=\S)\1/g,
                '<strong>$2</strong>'
            )
            html += '<li>' + content + '</li>'
        }

        if (_.type === 'List') {
            const list = _ as List

            console.log('==>', 100, list)
            const { children } = list
            console.log('==>', 101, children)

            const yo = buildListHtml(children)

            console.log('==>', 102, yo)
            console.log('==>', 103, stack, stack.at(-1))

            if (stack.at(-1)?.type === 'Text') {
                console.log('==>', 200)
                html += yo
            } else {
                console.log('==>', 300)
                html += '<ul>' + yo + '</ul>'
            }
        }
    })

    return html
}
