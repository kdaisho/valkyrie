import {
    Anchor,
    Heading,
    List,
    OrderedList,
    Paragraph,
    Text,
    Whiteline,
} from './types'

type Node = Heading | List | OrderedList | Paragraph | Text | Whiteline

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: (List | Anchor | Text)[] = []
    const liItemStack: (Anchor | Text)[] = []
    const olStack: OrderedList[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        if (node.type === 'List') {
            let _node = node as List | null
            if (_node === null) return

            console.log('==> LiStack', liStack)

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            if (stack[stack.length - 1]?.type === 'List') {
                const parent = liStack[liStack.length - 1]

                if (parent.depth === _node.depth) {
                    console.log('==> ????', _node.children) // single dimensional array
                    parent.children.push(..._node.children)
                    _node = null
                } else {
                    console.log('==> PARENT', parent)
                    console.log('==> liItemStack', liItemStack)
                    console.log('==> _node', _node)
                    liItemStack.push(..._node.children)
                    parent.children.push(_node)
                }
            } else {
                console.log('==> inserting1', _node)
                output.push(_node)
            }

            if (_node) {
                liItemStack.push(..._node.children)
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
