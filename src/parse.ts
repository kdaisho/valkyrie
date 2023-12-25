import { Heading, Text, List, OrderedList, Whiteline } from './types'

type Node = Heading | Text | List | OrderedList | Whiteline

function parse(Nodes: Node[][]) {
    let counter = 0
    const ast: Node[] = []

    while (counter < Nodes.length) {
        const [first, ...rest] = Nodes[counter]
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

        if (first.type === 'Text') {
            const _ = element as Text
            _.type = 'Text'
            _.value = first.value
            element = _
        }

        if (first.type === 'Whiteline') {
            element.type = 'Whiteline'
        }

        ast.push(element)
        counter++
    }
    return ast
}

export default parse
