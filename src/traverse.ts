import {
    Heading,
    List,
    ListItem,
    OrderedList,
    Paragraph,
    Text,
    Whiteline,
} from './types'

type Node = Heading | List | OrderedList | Paragraph | Text | Whiteline

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: List[] = []
    const liItemStack: (List | ListItem)[] = []
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

            if (stack[stack.length - 1]?.type === 'OrderedList') {
                const parent = olStack[olStack.length - 1]
                parent.children.push(..._node.children)
                _node = null
            } else {
                output.push(_node)
            }

            if (_node) {
                olStack.push(_node)
            }
        } else if (node.type === 'Paragraph') {
            const lastItem = stack[stack.length - 1]
            if (lastItem?.type === 'Paragraph') {
                lastItem.children.push(...node.children)
            } else {
                output.push(node)
            }
        } else {
            output.push(node)
        }

        stack.push(node)
    })

    console.log('==> trvse', output)

    return output
}
