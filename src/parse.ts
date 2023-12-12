/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLeafNodes } from './utils'

type LexicalBlock = {
    type: string
    value: string
    depth?: number
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
        const lexicalBlock = lexicalBlocks[counter]

        // console.log('==> EACH C', counter)
        // console.log('==> EACH', lexicalBlock)

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

        // if (first.type === 'Indentation') {
        //     counter++
        //     continue
        // if (!rest.length) {
        // }

        // if (rest.length) {
        //     const [_first, ..._rest] = rest

        //     if (_first.type === 'List' && ast.at(-1)?.type === 'List') {
        //         element.type = 'List'
        //         element.value = _first.value
        //         element.children = _rest

        //         if (ast.at(-1)?.children?.at(-1)?.children) {
        //             ast.at(-1)?.children?.at(-1)?.children?.push(_rest[0])
        //             counter++
        //             continue
        //         }

        //         ast.at(-1)?.children?.push(element)
        //     }

        //     if (_first.type === 'Text') {
        //         element.type = 'Text'
        //         element.value = _first.value

        //         ast.push(element)
        //     }
        // }

        // counter++
        // continue
        // }

        if (first.type === 'List') {
            element.type = 'List'
            element.value = first.value
            element.depth = first.depth
            element.children = rest

            // console.log('==> AST?', ast)
            // console.log('==> rest?', rest)

            const last = ast.at(-1)
            if (counter >= 1 && last?.type === 'List') {
                console.log('==> ast?', ast)
                console.log('==> ast last?', last)
                console.log('==> _counter?', counter)
                console.log('==> first?', first)

                const gap = last.depth! - first.depth!

                console.log('==> gap?', gap)

                if (gap <= -2) {
                    last.depth = first.depth

                    // last.children?.push(element)
                    console.log('==> HOW?', last)
                    const ch = getLeafNodes(ast.at(-1)!)
                    console.log('==> CH?', ch)
                    console.log('==> EL?', element)
                    ch.children.push(element)

                    // if (ch.children && Array.isArray(ch.children)) {
                    //     console.log('==>', 'wow 1', ch)
                    //     console.log('==>', 'wow 2', element)
                    //     ch.children.push(element)

                    counter++
                    continue
                    // }
                }

                // if (prev?.type === 'List') {
                //     const gap = prev.depth! - first.depth!

                //     if (gap <= -2) {
                //         const [parsed] = parse([[first, ...rest]])
                //         prev.children?.push(parsed)

                //         console.log('==> }}}}', { counter })
                //         console.log('==> }}}}', { ast })
                //         counter++
                //         continue
                //     }
                // }
            }

            // counter++
            // continue
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
