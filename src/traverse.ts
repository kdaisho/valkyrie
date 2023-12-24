import { getLeafNode } from './utils'

type LexicalBlock = {
    type: string
    value: string
    depth: number
    children?: LexicalBlock[]
}

type List = {
    type: 'List'
    value: string
    depth: number
    children?: (LexicalBlock | List)[]
}

export default function traverse(ast: (LexicalBlock | List)[]) {
    function nestLists(arr) {
        const result = []
        const listStack = []

        arr.forEach(item => {
            if (item.type === 'List') {
                while (
                    listStack.length > 0 &&
                    listStack.at(-1).depth >= item.depth
                ) {
                    listStack.pop()
                }

                if (listStack.length === 0) {
                    result.push(item)
                } else {
                    const parent = listStack.at(-1)
                    parent.children.push(item)
                }

                listStack.push(item)
            } else {
                result.push(item)
            }
        })

        return result
    }

    return nestLists(ast)
}
