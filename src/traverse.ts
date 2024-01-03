import { List, ListItem, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liItemStack: (List | ListItem)[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        let _node = node as List | null

        if (_node === null) return

        while ((stack.at(-1) as List)?.depth > _node.depth) {
            stack.pop()
        }

        const parent = stack.at(-1)

        if (node.type === 'List' && parent?.type === 'List') {
            if (parent.depth !== _node.depth) {
                parent.children.at(-1)?.children.push(_node)
            } else {
                const listItem = liItemStack.at(-1) as List

                if (listItem.depth > _node.depth) {
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

            if (_node.type === 'List') {
                liItemStack.push(..._node.children)
            }
        }
    })

    console.log('==> traverse', JSON.stringify(output, null, 2))

    return output
}
