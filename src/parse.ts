/* eslint-disable @typescript-eslint/no-explicit-any */
type Token = {
    type: string
    value: string
}
export default function (tokenCollections: Token[][]) {
    let counter = 0
    const ast = []

    while (counter < tokenCollections.length) {
        const tokens = tokenCollections[counter]
        const [first, ...rest] = tokens
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

        if (first.type === 'List') {
            element.type = 'List'
            element.value = first.value
            element.children = rest

            while (tokenCollections[counter + 1]?.[0]?.type === 'List') {
                element.children.push(tokenCollections[counter + 1]?.[1])
                counter++
            }
        }

        ast.push(element)

        counter++
    }

    console.log('==> PARSE END', ast)

    return ast
}
