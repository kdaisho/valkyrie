import { populateChildren } from './utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
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
    children: LexicalBlocks
}

type Text = {
    type: 'Text'
    value: string
}

type List = {
    type: 'List'
    value: string
    children: LexicalBlocks
}

type Indentation = {
    type: 'Indentation'
    value: number
    children: LexicalBlocks
}

type LexicalBlocks = (Heading | Text | List | Indentation)[]

function generate(lexicalBlocks: LexicalBlocks) {
    let counter = 0
    let html = ''

    while (counter < lexicalBlocks.length) {
        if (lexicalBlocks[counter].type === 'Heading') {
            const lexicalBlock = lexicalBlocks[counter] as Heading
            const openingTag = '<' + heading[lexicalBlock.value.length] + '>'
            const content = lexicalBlock.children.map(child => {
                if (child.type === 'Text') {
                    return child.value
                }
            })
            const closingTag = '</' + heading[lexicalBlock.value.length] + '>'
            html += openingTag + content + closingTag
            counter++
            continue
        }

        if (lexicalBlocks[counter].type === 'Text') {
            const openingTag = '<p>'
            const content = (lexicalBlocks[counter] as Text).value.replace(
                /(\*\*|__)(?=\S)([^*_]+?)(?<=\S)\1/g,
                '<strong>$2</strong>'
            )
            const closingTag = '</p>'
            html += openingTag + content + closingTag
            counter++
            continue
        }

        if (lexicalBlocks[counter].type === 'List') {
            const lexicalBlock = lexicalBlocks[counter] as List
            const tag = lexicalBlock.value === '-' ? 'ul' : 'ol'
            const openingTag =
                '<' +
                tag +
                (tag === 'ol' ? ` start=${lexicalBlock.value}` : '') +
                '>'

            populateChildren(lexicalBlock)

            const content = lexicalBlock.children
                .map(child => {
                    if (child.type === 'Text') {
                        return '<li>' + child.value + '</li>'
                    }

                    const generated = generate(child.children)

                    return generated
                })
                .join('')
            const closingTag = '</' + tag + '>'
            html += openingTag + content + closingTag
            counter++
            continue
        }
    }

    return html
}

export default generate
