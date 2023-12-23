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

let html = ''

const ref: List[] = []
let cursor = -1

let tag = ''
let _c = 0

function generate(lexicalBlocks: LexicalBlocks) {
    console.log('==> INIT', lexicalBlocks)
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
            cursor++

            tag = lexicalBlocks[0].value === '-' ? 'ul' : 'ol'
            const openingTag =
                '<' +
                tag +
                (tag === 'ol' ? ` start=${lexicalBlocks[0].value}` : '') +
                '>'

            html += openingTag

            const content = lexicalBlocks[0].children
                .map(child => {
                    if (child.type === 'Text') {
                        return '<li>' + child.value + '</li>'
                    }
                })
                .join('')

            html += content

            if (lexicalBlocks[1]?.type === 'List') {
                console.log('==> NEXT IS LIST', lexicalBlocks[1], html)
                let gap = lexicalBlocks[1]?.depth - lexicalBlocks[0]?.depth

                if (gap >= 1) {
                    console.log('==> case 1')
                    lexicalBlocks.shift()
                    generate(lexicalBlocks)
                } else if (gap <= -1) {
                    console.log('==> case 2')
                    html += '</' + tag + ' wow2>'
                    while (gap < 0) {
                        html += '</' + tag + ` wow_${gap}>`
                        gap++
                    }
                    // html += '</' + tag + '>'
                    lexicalBlocks.shift()
                    continue
                } else {
                    console.log('==> case 3')
                    html +=
                        '<li>' + lexicalBlocks[1].children[0].value + '</li>'

                    console.log('==> case 3.5', html)

                    lexicalBlocks.shift()
                    lexicalBlocks.shift()
                    html += '</' + tag + '>'
                    continue
                    // generate(lexicalBlocks)
                }
            } else {
                console.log('==> NEXT IS NOT LIST', lexicalBlocks[1], html)
            }
            html += '</' + tag + ' zzz>'
        }

        lexicalBlocks.shift()
    }

    return html
}

export default generate
