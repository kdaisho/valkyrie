/* eslint-disable @typescript-eslint/no-explicit-any */
type LexicalBlock = {
    type: string
    value: string
    children?: LexicalBlock[]
}
export default function (lexicalBlocks: LexicalBlock[][]) {
    let counter = 0
    const ast: LexicalBlock[] = []

    while (counter < lexicalBlocks.length) {
        const lexicalBlock = lexicalBlocks[counter]
        const [first, ...rest] = lexicalBlock
        const element: any = {}

        if (first.type === 'Heading') {
            element.type = 'Heading'
            element.value = first.value
            element.children = rest
        }

        if (first.type === 'Text') {
            element.type = 'Text'
            element.value = first.value
        }

        if (first.type === 'Indentation') {
            if (!rest.length) {
                counter++
                continue
            }

            if (rest.length) {
                const [_first, ..._rest] = rest

                if (_first.type === 'List' && ast.at(-1)?.type === 'List') {
                    element.type = 'List'
                    element.value = _first.value
                    element.children = _rest

                    if (ast.at(-1)?.children?.at(-1)?.children) {
                        ast.at(-1)?.children?.at(-1)?.children?.push(_rest[0])
                        counter++
                        continue
                    }

                    ast.at(-1)?.children?.push(element)
                }

                if (_first.type === 'Text') {
                    element.type = 'Text'
                    element.value = _first.value

                    ast.push(element)
                }
            }

            counter++
            continue
        }

        if (first.type === 'List') {
            element.type = 'List'
            element.value = first.value
            element.children = rest

            while (lexicalBlocks[counter + 1]?.[0]?.type === 'List') {
                element.children.push(lexicalBlocks[counter + 1]?.[1])
                counter++
            }
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
