import { Heading, Text, List } from './types'

type Node = Heading | Text | List

export default function traverse(ast: Node[]) {
    const result: Node[] = []
    const listStack: List[] = []

    ast.forEach(_ => {
        if (_.type === 'List') {
            const item = _ as List
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
            result.push(_)
        }
    })

    return result
}
