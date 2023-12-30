import { Heading, List, OrderedList, Anchor, Paragraph, Text } from '../types'
import { buildListHtml, getTextBody } from './utils'

const heading: Record<number, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
}

type AST = (Heading | List | OrderedList | Anchor | Paragraph | Text)[]

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

        if (ast[0].type === 'List') {
            const { children } = ast[0]
            html += '<ul>' + buildListHtml(children) + '</ul>'
            ast.shift()

            continue
        }

        if (ast[0].type === 'OrderedList') {
            const { value, children } = ast[0]
            html +=
                '<ol start="' + value + '">' + buildListHtml(children) + '</ol>'
            ast.shift()

            continue
        }

        if (ast[0].type === 'Anchor') {
            const { href, text } = ast[0]
            html += '<a href="' + href + '">' + (text ?? href) + '</a>'
            ast.shift()

            continue
        }

        if (ast[0].type === 'Paragraph') {
            const { children } = ast[0]
            const body = children.reduce((acc, cur) => {
                if (cur.type === 'Text') {
                    acc += getTextBody(cur.value)
                } else if (cur.type === 'Anchor') {
                    acc +=
                        '<a href="' +
                        cur.href +
                        '">' +
                        (cur.text ?? cur.href) +
                        '</a>'
                }
                return acc
            }, '')
            html += '<p>' + body + '</p>'
            ast.shift()

            continue
        }

        if (ast[0].type === 'Text') {
            const { value } = ast[0]
            html += '<p>' + getTextBody(value) + '</p>'
            ast.shift()

            continue
        }

        ast.shift()
    }

    console.log('==> HTML', html)

    return html
}

export default generate
