import { List, ListItem, OrderedList, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: (List | OrderedList)[] = []
    const liItemStack: (List | OrderedList | ListItem)[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        if (node.type === 'List') {
            let _node = node as List | null

            if (_node === null) return

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            if (
                stack[stack.length - 1]?.type === 'List' ||
                stack[stack.length - 1]?.type === 'OrderedList'
            ) {
                const parent = liStack[liStack.length - 1]

                if (parent.depth === _node.depth) {
                    if (parent.type === 'List') {
                        parent.children.push(..._node.children)
                    } else {
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
                            liStack.push(_node)
                            output.push(_node)
                        } else {
                            parent.children.push(..._node.children)
                        }
                    }
                    _node = null
                } else {
                    liStack[liStack.length - 1].children.push(_node)
                }
            } else {
                output.push(_node)
            }

            if (_node) {
                liItemStack.push(..._node.children)
                liStack.push(_node)
            }
        } else if (node.type === 'OrderedList') {
            const _node = node as OrderedList

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            if (
                stack[stack.length - 1]?.type === 'OrderedList' ||
                stack[stack.length - 1]?.type === 'List'
            ) {
                const parent = liStack[liStack.length - 1]
                if (parent.depth === _node.depth) {
                    liStack[liStack.length - 1].children.push(..._node.children)
                } else {
                    liStack[liStack.length - 1].children.push(_node)
                }
            } else {
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

    console.log('==> traverse', output)

    return output
}
