import { List, ListItem, OrderedList, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: (List | OrderedList)[] = []
    const liItemStack: (List | OrderedList | ListItem)[] = []
    // const olStack: OrderedList[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        // console.log('==> =================', 300, node)

        if (node.type === 'List') {
            let _node = node as List | null

            if (_node === null) return

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            // console.log('==>', 301, liStack)
            // console.log('==>', 302, JSON.stringify(stack, null, 2))

            if (
                stack[stack.length - 1]?.type === 'List' ||
                stack[stack.length - 1]?.type === 'OrderedList'
            ) {
                const parent = liStack[liStack.length - 1]

                if (parent.depth === _node.depth) {
                    // parent.children.push(..._node.children)

                    parent.type === 'List'
                        ? parent.children.push(..._node.children)
                        : parent.children.push(_node)

                    _node = null
                } else {
                    // console.log('==>', 600, liItemStack)

                    // liItemStack.push(..._node.children)
                    liItemStack[liItemStack.length - 1].children.push(_node)
                    // console.log('==>', 601, liItemStack)

                    // console.log('==>', 700, parent)
                    // parent.children.push(_node)
                    // console.log('==>', 701, parent)
                }
            } else {
                console.log('==>', 800, _node)
                // NO NEED THIS????
                output.push(_node)
            }

            if (_node) {
                liItemStack.push(..._node.children)
                liStack.push(_node)
            }
        } else if (node.type === 'OrderedList') {
            let _node = node as OrderedList | null
            if (_node === null) return

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            // console.log('==>', 10, stack)

            if (
                stack[stack.length - 1]?.type === 'OrderedList' ||
                stack[stack.length - 1]?.type === 'List'
            ) {
                const parent = liStack[liStack.length - 1]
                // console.log('==>', 400, parent)
                // console.log('==>', 401, liItemStack)
                if (parent.depth === _node.depth) {
                    // console.log('==>', 1000)
                    // console.log('==>', 11, parent)
                    // parent.children.push(..._node.children)

                    parent.type === 'OrderedList'
                        ? parent.children.push(..._node.children)
                        : output.push(_node)

                    // console.log('==>', 1001, parent)
                    // console.log('==>', 1002, JSON.stringify(output, null, 2))

                    // parent.children.push(_node)
                    _node = null
                } else {
                    // console.log('==>', 500, liItemStack)
                    // liItemStack.push(..._node.children)
                    liItemStack[liItemStack.length - 1].children.push(_node)

                    // console.log('==>', 501, liItemStack)

                    _node = null

                    // parent.children.push(_node)
                    // console.log('==>', 101, parent)
                }
            } else {
                // console.log('==>', 900, _node)
                output.push(_node)
            }

            if (_node) {
                // olStack.push(_node)
                liItemStack.push(..._node.children)
                liStack.push(_node)
                // console.log('==>', 102, liItemStack, _node.children)
                // console.log('==>', 103, { liStack, _node })
            }
        } else {
            output.push(node)
        }

        stack.push(node)
    })

    console.log('==> traverse', JSON.stringify(output, null, 2))

    return output
}
