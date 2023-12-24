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
                console.log('==>', 100)
                while (
                    listStack.length > 0 &&
                    listStack[listStack.length - 1].depth >= item.depth
                ) {
                    console.log('==>', 101)
                    listStack.pop()
                }

                if (listStack.length === 0) {
                    // New top-level list
                    result.push(item)
                    console.log('==>', 102)
                } else {
                    console.log('==>', 103)
                    // Nest within the last list item
                    const parent = listStack[listStack.length - 1]
                    if (!parent.children) {
                        console.log('==>', 104)
                        parent.children = []
                    }
                    console.log('==>', 105)
                    parent.children.push(item)
                }
                console.log('==>', 106)

                listStack.push(item)
            } else {
                console.log('==>', 107)
                result.push(item)
            }
        })

        return result
    }

    // console.log('DONE2', JSON.stringify(nestLists(ast), null, 2))

    return nestLists(ast)
}
