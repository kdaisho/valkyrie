/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildListHtml, populateChildren } from './utils'

const heading: Record<number, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
}

type Heading = {
    type: 'Heading'
    value: string
    children: AST
}

type Text = {
    type: 'Text'
    value: string
}

type List = {
    type: 'List'
    value: string
    depth: number
    children: AST
}

type Indentation = {
    type: 'Indentation'
    value: number
    children: AST
}

type AST = (Heading | Text | List | Indentation)[]

let html = ''

function generate(ast: AST) {
    console.log('==> INIT', JSON.stringify(ast, null, 2))

    while (ast.length) {
        if (ast[0].type === 'Heading') {
            const { value, children } = ast[0]
            const openingTag = '<' + heading[value.length] + '>'
            const text = children[0].value
            const closingTag = '</' + heading[value.length] + '>'
            html += openingTag + text + closingTag
            ast.shift()

            continue
        }

        if (ast[0].type === 'Text') {
            const { value } = ast[0]
            const content = value.replace(
                /(\*\*|__)(?=\S)([^*_]+?)(?<=\S)\1/g,
                '<strong>$2</strong>'
            )
            html += '<p>' + content + '</p>'
            ast.shift()

            continue
        }

        // if (ast[0].type === 'List') {
        //     const { children } = ast[0] as { children: List[] }
        //     const content = buildListHtml(children)
        //     html += '<ul>' + content + '</ul>'
        //     ast.shift()

        //     continue
        // }

        ast.shift()
    }

    // console.log('==> HTML', html)

    return html
}

export default generate
