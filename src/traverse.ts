import { List, ListItem, OrderedList, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: (List | OrderedList)[] = []
    const liItemStack: (List | OrderedList | ListItem)[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        console.log('==>', 600, liStack)

        if (node.type === 'List') {
            let _node = node as List | null

            if (_node === null) return

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            console.log('==>', 100, _node)
            console.log('==>', 100.5, JSON.stringify(liStack, null, 2))

            console.log('==> output', output)

            if (
                stack[stack.length - 1]?.type === 'List' ||
                stack[stack.length - 1]?.type === 'OrderedList'
            ) {
                const parent = liStack[liStack.length - 1]

                if (parent.depth === _node.depth) {
                    console.log('==>', 101, parent)
                    if (parent.type === 'List') {
                        console.log('==>', 102, _node)
                        parent.children.push(..._node.children)
                        console.log('==>', 103, parent)
                    } else {
                        console.log('==>', 104, _node)
                        if (
                            liItemStack[liItemStack.length - 1].type ===
                                'List' ||
                            (liItemStack[liItemStack.length - 1].type ===
                                'OrderedList' &&
                                (
                                    liItemStack[liItemStack.length - 1] as
                                        | List
                                        | OrderedList
                                ).depth > _node.depth)
                        ) {
                            console.log('==>', 105, _node)
                            console.log('==>', 'hun?')
                            liStack.push(_node)
                            output.push(_node)
                        } else {
                            console.log('==>', 106, _node)
                            parent.children.push(..._node.children)
                        }
                    }
                    _node = null
                } else {
                    console.log('==>', 200, _node)
                    console.log('==>', 201, liStack)
                    console.log('==>', 201.5, parent)
                    console.log('==>', 202, liItemStack)
                    console.log('==>', 203, output)
                    // output.push(_node)

                    liStack[liStack.length - 1].children.push(_node)
                    // liStack.push(_node)

                    // might need this
                    // liItemStack[liItemStack.length - 1].children.push(_node)

                    console.log('==>', 2021, liStack)

                    // if (
                    //     liItemStack[liItemStack.length - 1].type === 'List' ||
                    //     (liItemStack[liItemStack.length - 1].type ===
                    //         'OrderedList' &&
                    //         (
                    //             liItemStack[liItemStack.length - 1] as
                    //                 | List
                    //                 | OrderedList
                    //         ).depth > _node.depth)
                    // ) {
                    //     console.log('==>', '======================== GAAAA')
                    //     output.push(_node)
                    // }
                }
            } else {
                console.log('==>', 1000, _node)
                output.push(_node)
            }

            if (_node) {
                liItemStack.push(..._node.children)
                liStack.push(_node)
            }
        } else if (node.type === 'OrderedList') {
            let _node = node as OrderedList | null

            if (_node === null) return

            console.log('==>', 0, _node)

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            if (
                stack[stack.length - 1]?.type === 'OrderedList' ||
                stack[stack.length - 1]?.type === 'List'
            ) {
                const parent = liStack[liStack.length - 1]
                console.log('==>', 300, liStack)
                if (parent.depth === _node.depth) {
                    console.log('==>', 301)
                    liStack[liStack.length - 1].children.push(..._node.children)
                    console.log('==>', 301.5, liStack)

                    _node = null
                } else {
                    console.log('==>', 302)
                    liStack[liStack.length - 1].children.push(_node)
                }
                console.log('==>', 303, _node)
                console.log('==>', 304, liStack)
                // liStack[liStack.length - 1].children.push(_node)
                console.log('==>', 305, liStack)
                // output.push(_node)
            } else {
                console.log('==>', 400, _node)
                output.push(_node)
            }

            if (_node) {
                liItemStack.push(_node)
                liStack.push(_node)
            }
        } else {
            output.push(node)
        }

        stack.push(node)
    })

    console.log('==> traverse', JSON.stringify(output, null, 2))

    return output
}
