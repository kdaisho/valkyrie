import { List, ListItem, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liItemStack: (List | ListItem)[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        let _node = node as List | null

        if (_node === null) return

        while (
            stack[stack.length - 1]?.type === 'List' &&
            (stack[stack.length - 1] as List).depth > _node.depth
        ) {
            stack.pop()
        }

        const parent = stack[stack.length - 1]

        if (node.type === 'List' && node.value === '-') {
            if (parent?.type === 'List') {
                if (parent.depth === _node.depth) {
                    if (parent.type === 'List' && parent.value === '-') {
                        parent.children.push(..._node.children)
                    } else {
                        if (
                            (liItemStack[liItemStack.length - 1] as List)
                                .value !== '-' &&
                            (liItemStack[liItemStack.length - 1] as List)
                                .depth > _node.depth
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
        } else if (node.type === 'List' && node.value !== '-') {
            if (parent?.type === 'List') {
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
