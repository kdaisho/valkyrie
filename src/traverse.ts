import { Heading, Text, List, OrderedList, Whiteline } from './types'

type Node = Heading | Text | List | OrderedList | Whiteline

export default function traverse(ast: Node[]) {
    const result: Node[] = []
    const listStack: List[] = []
    const orderedListStack: OrderedList[] = []
    const stack: Node[] = []

    ast.forEach(_ => {
        if (_.type === 'List') {
            let item = _ as List | null
            if (item === null) return

            while (listStack.at(-1) && listStack.at(-1)!.depth > item.depth) {
                listStack.pop()
            }

            if (!listStack.length) {
                result.push(item)
            } else if (stack.at(-1)?.type === 'List') {
                const parent = listStack.at(-1)!

                if (parent.depth === item.depth) {
                    parent.children.push(...item.children)
                    item = null
                } else {
                    parent.children.push(item)
                }
            } else {
                result.push(item)
            }

            if (item) {
                listStack.push(item)
            }
        } else if (_.type === 'OrderedList') {
            const item = _ as OrderedList

            if (!orderedListStack.length) {
                result.push(item)
            } else if (stack.at(-1)?.type === 'OrderedList') {
                const parent = orderedListStack.at(-1)!
                parent.children.push(...item.children)
            } else {
                result.push(item)
            }

            orderedListStack.push(item)
        } else {
            result.push(_)
        }

        stack.push(_)
    })

    return result
}
