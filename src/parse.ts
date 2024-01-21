import {
    Heading,
    Image,
    List,
    URL,
    Paragraph,
    Text,
    ListItem,
    Node,
    Token,
} from '../types'

function parse(nodes: Token[][]) {
    let counter = 0
    const ast: Node[] = []

    while (counter < nodes.length) {
        const [first, ...rest] = nodes[counter]
        let element = {} as Node

        if (first.type === 'Heading') {
            const _ = element as Heading
            _.type = 'Heading'
            _.symbol = first.symbol
            _.children = rest as Text[]
            element = _
        }

        if (first.type === 'Image') {
            const _ = element as Image
            _.type = 'Image'
            _.symbol = first.symbol
            _.children = rest as URL[]
            element = _
        }

        if (first.type === 'List') {
            const _ = element as List
            _.type = 'List'
            _.symbol = first.symbol
            _.depth = first.depth
            const listItem: ListItem = {
                type: 'ListItem',
                children: rest as (List | URL | Text)[],
            }
            _.children = [listItem]
            element = _
        }

        if (first.type === 'URL' || first.type === 'Whiteline') {
            element = first
        }

        if (first.type === 'Paragraph') {
            const _ = element as Paragraph
            _.type = 'Paragraph'
            _.children = rest as (Text | URL)[]
            element = _
        }

        ast.push(element)
        counter++
    }

    console.log('==> AST', ast)

    return ast
}

export default parse
