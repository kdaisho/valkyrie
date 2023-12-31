import { List, ListItem, OrderedList, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: (List | OrderedList)[] = []
    const liItemStack: (List | OrderedList | ListItem)[] = []
    // const olStack: OrderedList[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        if (node.type === 'List') {
            let _node = node as List | null
            if (_node === null) return

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            if (stack[stack.length - 1]?.type === 'List') {
                const parent = liStack[liStack.length - 1]

                if (parent.depth === _node.depth) {
                    parent.children.push(..._node.children)
                    _node = null
                } else {
                    liItemStack.push(..._node.children)
                    parent.children.push(_node)
                }
            } else {
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
                if (parent.depth === _node.depth) {
                    // console.log('==>', 11, parent)
                    // parent.children.push(..._node.children)

                    parent.type === 'OrderedList'
                        ? parent.children.push(..._node.children)
                        : output.push(_node)
                    // parent.children.push(_node)
                    _node = null
                } else {
                    // console.log('==>', 100)
                    liItemStack.push(..._node.children)
                    parent.children.push(_node)
                    // console.log('==>', 101, parent)
                }
            } else {
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

    console.log('==> traverse', output)

    return output
}
