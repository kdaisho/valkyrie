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

        if (node.type === 'List' && parent?.type === 'List') {
            if (parent.depth !== _node.depth) {
                parent.children.push(_node)
            } else {
                const listItem = liItemStack[liItemStack.length - 1] as List

                // TODO: treat both Lists the same way by removing the check for symbol -> if (listItem.depth > _node.depth)
                if (listItem.symbol !== '-' && listItem.depth > _node.depth) {
                    stack.push(_node)
                    output.push(_node)
                } else {
                    parent.children.push(..._node.children)
                }
                _node = null
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
