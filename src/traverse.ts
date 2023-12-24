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
                    console.log('==>', 101, item)
                    console.log('==>', 102, listStack)
                    listStack.pop()
                }

                if (listStack.length === 0) {
                    console.log('==>', 103, item)
                    result.push(item)
                } else {
                    console.log('==>', 104, item)
                    const parent = listStack[listStack.length - 1]
                    console.log('==>', 105, parent)

                    parent.children.push(item)
                }
                console.log('==>', 106, item)

                listStack.push(item)
            } else {
                console.log('==>', 200, item)
                result.push(item)
            }
        })

        return result
    }

    // console.log('DONE2', JSON.stringify(nestLists(ast), null, 2))

    return nestLists(ast)
}
