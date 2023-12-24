/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeafNodes, peek } from './utils'

type LexicalBlock = {
    type: string
    value: string
    children?: LexicalBlock[]
}

type List = {
    type: 'List'
    value: string
    depth: number
    children?: (LexicalBlock | List)[]
}

function parse(lexicalBlocks: (LexicalBlock | List)[][]) {
    let counter = 0
    const ast: (LexicalBlock | List)[] = []

    while (counter < lexicalBlocks.length) {
        const [first, ...rest] = lexicalBlocks[counter]
        const element: any = {}

        if (first.type === 'Heading') {
            element.type = 'Heading'
            element.value = first.value
            element.children = rest
        }

        if (first.type === 'List') {
            element.type = 'List'
            element.value = first.value
            element.depth = first.depth
            element.children = rest
        }

        if (first.type === 'Text') {
            element.type = 'Text'
            element.value = first.value
        }

        if (first.type === 'Number') {
            element.type = 'List'
            element.value = first.value
            element.children = rest

            while (lexicalBlocks[counter + 1]?.[0]?.type === 'Number') {
                element.children.push(lexicalBlocks[counter + 1]?.[1])
                counter++
            }
        }

        ast.push(element)

        counter++
    }

    console.log('AST:', ast)

    return ast
}

export default parse
