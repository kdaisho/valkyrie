import { Heading, Text, List } from './types'

type Node = Heading | Text | List

export default function traverse(ast: Node[]) {
    const result: Node[] = []
    const listStack: List[] = []

    ast.forEach(_ => {
        if (_.type === 'List') {
            let item = _ as List | null

            if (item === null) return

            while (listStack.at(-1) && listStack.at(-1)!.depth > item.depth) {
                listStack.pop()
            }

            if (!listStack.length) {
                result.push(item)
            } else {
                const parent = listStack.at(-1)!

                if (parent.depth === item.depth) {
                    parent.children.push(...item.children)
                    item = null
                } else {
                    parent.children.push(item)
                }
            }

            if (item) {
                listStack.push(item)
            }
        } else {
            result.push(_)
        }
    })

    return result
}
