import { Heading, List, OrderedList, Anchor, Text, Whiteline } from './types'

type Node = Heading | List | OrderedList | Anchor | Text | Whiteline

function parse(nodes: Node[][]) {
    console.log('==> Parse', nodes)

    let counter = 0
    const ast: Node[] = []

    while (counter < nodes.length) {
        const [first, ...rest] = nodes[counter]
        let element = {} as Node

        if (first.type === 'Heading') {
            const _ = element as Heading
            _.type = 'Heading'
            _.value = first.value
            _.children = rest as Text[]
            element = _
        }

        if (first.type === 'List') {
            const _ = element as List
            _.type = 'List'
            _.value = first.value
            _.depth = first.depth
            _.children = rest as (List | Text)[]
            element = _
        }

        if (first.type === 'OrderedList') {
            const _ = element as OrderedList
            _.type = 'OrderedList'
            _.value = first.value
            _.children = rest as Text[]
            element = _
        }

        if (first.type === 'Anchor' || first.type === 'Whiteline') {
            element = first
        }

        if (first.type === 'Text') {
            const _ = element as Text
            _.type = 'Text'
            _.value = first.value
            element = _
        }

        ast.push(element)
        counter++
    }
    console.log('==> AST', ast)

    return ast
}

export default parse
