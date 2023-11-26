/* eslint-disable @typescript-eslint/no-explicit-any */
const heading: Record<number, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
}

type Token = {
    type: string
    value: string
}

type Heading = {
    type: 'Heading'
    value: string
    children: Token[]
}

type Paragraph = {
    type: 'Text'
    value: string
}

type Ast = (Heading | Paragraph)[]

export default function (ast: Ast) {
    let counter = 0
    let html = ''

    while (counter < ast.length) {
        if (ast[counter].type === 'Heading') {
            const element = ast[counter] as Heading
            const openingTag = '<' + heading[element.value.length] + '>'
            const content = element.children.map(child => {
                if (child.type === 'Text') {
                    return child.value
                }
            })
            const closingTag = '</' + heading[element.value.length] + '>'
            html += openingTag + content + closingTag
            counter++
            continue
        }

        if (ast[counter].type === 'Text') {
            const openingTag = '<p>'
            const content = ast[counter].value
            const closingTag = '</p>'
            html += openingTag + content + closingTag
            counter++
            continue
        }
    }

    return html
}
