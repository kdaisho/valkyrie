import { Heading, Text, List, OrderedList, Whiteline } from './types'

type Node = Heading | Text | List | OrderedList | Whiteline

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: List[] = []
    const olStack: OrderedList[] = []
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
                    parent.children.push(_node)
                }
            } else {
                output.push(_node)
            }

            if (_node) {
                liStack.push(_node)
            }
        } else if (node.type === 'OrderedList') {
            if (stack[stack.length - 1]?.type === 'OrderedList') {
                const parent = olStack[olStack.length - 1]
                parent.children.push(...node.children)
            } else {
                output.push(node)
            }

            olStack.push(node)
        } else {
            output.push(node)
        }

        stack.push(node)
    })

    return output
}
