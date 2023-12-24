import { Heading, Text, List } from './types'

function parse(lexicalBlocks: (Heading | Text | List)[][]) {
    console.log('==> PA', lexicalBlocks)

    let counter = 0
    const ast: (Heading | Text | List)[] = []

    while (counter < lexicalBlocks.length) {
        const [first, ...rest] = lexicalBlocks[counter]
        let element = {} as Heading | Text | List

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

        if (first.type === 'Text') {
            element.type = 'Text'
            element.value = first.value
        }

        ast.push(element)

        counter++
    }

    return ast
}

export default parse
