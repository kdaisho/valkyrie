import { buildListHtml, getTextBody } from './utils'

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
    children: Text[]
}

type Text = {
    type: 'Text'
    value: string
}

type List = {
    type: 'List'
    value: string
    depth: number
    children: (List | Text)[]
}

type Indentation = {
    type: 'Indentation'
    value: number
    children: AST
}

type AST = (Heading | Text | List | Indentation)[]

function generate(ast: AST) {
    let html = ''

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
            html += '<p>' + getTextBody(value) + '</p>'
            ast.shift()

            continue
        }

        if (ast[0].type === 'List') {
            const { value, children } = ast[0]
            const content = buildListHtml(children)
            const tagName = value === '-' ? 'ul' : 'ol'
            const openingTag =
                '<' +
                tagName +
                (tagName === 'ol' ? ` start=${value}` : '') +
                '>'
            const closingTag = '</' + tagName + '>'

            html += openingTag + content + closingTag
            ast.shift()

            continue
        }

        ast.shift()
    }

    return html
}

export default generate
