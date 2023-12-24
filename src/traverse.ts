type Node = {
    type: string
    value: string
    children: Node[]
} & {
    type: 'List'
    depth: number
}

export default function traverse(ast: Node[]) {
    const result: Node[] = []
    const listStack: (Node & { depth: number })[] = []

    ast.forEach(item => {
        if (item.type === 'List') {
            while (listStack.at(-1) && listStack.at(-1)!.depth >= item.depth) {
                listStack.pop()
            }

            if (!listStack.length) {
                result.push(item)
            } else {
                const parent = listStack.at(-1)!
                parent.children.push(item)
            }

            listStack.push(item)
        } else {
            result.push(item)
        }
    })

    return result
}
