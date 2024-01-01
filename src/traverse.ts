import { List, ListItem, OrderedList, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liItemStack: (List | OrderedList | ListItem)[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        let _node = node as List | null

        if (_node === null) return

        console.log('==>', 10, _node)
        console.log('==>', 11, stack)

        while (
            (stack[stack.length - 1]?.type === 'List' ||
                stack[stack.length - 1]?.type === 'OrderedList') &&
            (stack[stack.length - 1] as List | OrderedList).depth > _node.depth
        ) {
            stack.pop()
        }

        const parent = stack[stack.length - 1]

        if (node.type === 'List') {
            if (parent?.type === 'List' || parent?.type === 'OrderedList') {
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
                            stack.push(_node)
                            output.push(_node)
                        } else {
                            parent.children.push(..._node.children)
                        }
                    }
                    _node = null
                } else {
                    parent.children.push(_node)
                }
            } else {
                output.push(_node)
            }
        } else if (node.type === 'OrderedList') {
            if (parent?.type === 'OrderedList' || parent?.type === 'List') {
                console.log('==>', 100, stack)

                if (parent.depth === _node.depth) {
                    parent.children.push(..._node.children)
                    _node = null
                } else {
                    parent.children.push(_node)
                }
            } else {
                output.push(_node)
            }
        } else {
            output.push(node)
        }

        if (_node) {
            stack.push(_node)
            liItemStack.push(_node)
        }
    })

    console.log('==> traverse', output)

    return output
}
