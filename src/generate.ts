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

type UnorderedList = {
    type: 'UnorderedList'
    value: string
    children: Token[]
}

type OrderedList = {
    type: 'OrderedList'
    value: string
    children: Token[]
}

type Ast = (Heading | Paragraph | UnorderedList | OrderedList)[]

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

        if (ast[counter].type === 'UnorderedList') {
            const element = ast[counter] as UnorderedList

            if (ast[counter].value === '-') {
                const openingTag = '<ul>'
                const content = element.children
                    .map(child => {
                        if (child.type === 'Text') {
                            return '<li>' + child.value + '</li>'
                        }
                    })
                    .join('')
                const closingTag = '</ul>'
                html += openingTag + content + closingTag
                counter++
                continue
            }
        }

        if (ast[counter].type === 'OrderedList') {
            const element = ast[counter] as OrderedList

            if (ast[counter].value === '1') {
                const openingTag = '<ol>'
                const content = element.children
                    .map(child => {
                        if (child.type === 'Text') {
                            return '<li>' + child.value + '</li>'
                        }
                    })
                    .join('')
                const closingTag = '</ol>'
                html += openingTag + content + closingTag
                counter++
                continue
            }
        }
    }

    return html
}
