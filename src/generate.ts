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
    depth: number
    children: LexicalBlocks
}

type Indentation = {
    type: 'Indentation'
    value: number
    children: LexicalBlocks
}

type LexicalBlocks = (Heading | Text | List | Indentation)[]

let counter = 0
let html = ''

function generate(lexicalBlocks: LexicalBlocks) {
    counter++
    console.log('==> INIT1', lexicalBlocks.length, lexicalBlocks)
    console.log('==> INIT2', { html })

    if (counter >= 12) {
        console.log('==>', '======================== DONE1')
        console.log('==>', '======================== DONE2', { html })
        return html
    }

    while (lexicalBlocks.length) {
        if (lexicalBlocks[0].type === 'Heading') {
            const lexicalBlock = lexicalBlocks[0] as Heading
            const openingTag = '<' + heading[lexicalBlock.value.length] + '>'
            const content = lexicalBlock.children.map(child => {
                if (child.type === 'Text') {
                    return child.value
                }
            })
            const closingTag = '</' + heading[lexicalBlock.value.length] + '>'
            html += openingTag + content + closingTag
            lexicalBlocks.shift()
            continue
        }

        if (lexicalBlocks[0].type === 'Text') {
            const openingTag = '<p>'
            const content = (lexicalBlocks[0] as Text).value.replace(
                /(\*\*|__)(?=\S)([^*_]+?)(?<=\S)\1/g,
                '<strong>$2</strong>'
            )
            const closingTag = '</p>'
            html += openingTag + content + closingTag
            lexicalBlocks.shift()
            continue
        }

        if (lexicalBlocks[0].type === 'List') {
            const tag = lexicalBlocks[0].value === '-' ? 'ul' : 'ol'
            const openingTag =
                '<' +
                tag +
                (tag === 'ol' ? ` start=${lexicalBlocks[0].value}` : '') +
                '>'

            html += openingTag

            let content = lexicalBlocks[0].children
                .map(child => {
                    if (child.type === 'Text') {
                        return '<li>' + child.value + '</li>'
                    }
                })
                .join('')

            console.log('==> CONTENT ONE', content)

            html += content

            if (
                lexicalBlocks[1]?.type === 'List' &&
                lexicalBlocks[0]?.depth < lexicalBlocks[1]?.depth
            ) {
                lexicalBlocks.shift()
                generate(lexicalBlocks)
            }

            console.log('==> CONTENT', content)

            html += '</' + tag + '>'

            lexicalBlocks.shift()
            continue
        }

        lexicalBlocks.shift()
    }

    return html
}

export default generate
