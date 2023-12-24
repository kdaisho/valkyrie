import { Heading, Text, List } from './types'

type Node = Heading | Text | List

export default function traverse(ast: Node[]) {
    const result: Node[] = []
    const listStack: List[] = []

    ast.forEach(_ => {
        if (_.type === 'List') {
            let item = _ as List | null

            console.log('==>', 100, item)
            console.log('==>', 100.5, listStack)

            while (listStack.at(-1) && listStack.at(-1)!.depth > item.depth) {
                console.log('==>', 101)
                listStack.pop()
            }

            // while (listStack.at(-1) && listStack.at(-1)!.depth === item.depth) {
            //     console.log('==>', 200, listStack)
            //     const last = listStack.pop()!
            //     last.children.push(...item.children)
            //     listStack.push(last)
            // }

            if (!listStack.length) {
                console.log('==>', 102, item)
                result.push(item)
            } else {
                const parent = listStack.at(-1)!
                console.log('==>', 103, parent)

                if (parent.depth === item.depth) {
                    console.log('==>', 104, listStack)
                    parent.children.push(...item.children)
                    console.log('==>', 104.5, parent)

                    // listStack.push(parent)

                    console.log('==>', 104.75, listStack)

                    // parent.children.push(item)
                    item = null
                } else {
                    console.log('==>', 105, parent, item)
                    console.log('==>', 106, parent)

                    parent.children.push(item)
                    console.log('==>', 107, result)
                }
            }

            // console.log('==>', 108, item)

            if (item) {
                listStack.push(item)
            }
        } else {
            result.push(_)
        }
    })

    return result
}
