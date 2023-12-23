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

let rootDepth = 0
let currentDepth = 0
let counter = 0
let html = ''

const ref: List[] = []
let cursor = -1

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
            ref.push(lexicalBlocks[0])
            cursor++

            const tag = lexicalBlocks[0].value === '-' ? 'ul' : 'ol'
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

            console.log('==> CONTENT ONE', content)

            html += content

            while (lexicalBlocks[1]?.type === 'List') {
                const cal = ref[cursor]?.depth - lexicalBlocks[1]?.depth
                console.log('==> REF', { ref, cursor, cal, lexicalBlocks })
                lexicalBlocks.shift()

                if (cal < 0) {
                    console.log('==> Case 1')
                    generate(lexicalBlocks)
                    html += '</' + tag + ' wow>'
                    continue
                }
                if (cal === 0) {
                    console.log('==> Case 2')
                    html +=
                        '<li>' + lexicalBlocks[0].children[0].value + '</li>'
                    // html += '</' + tag + ' wow>'
                    continue
                }
                if (cal > 0) {
                    console.log('==> Case 3')
                    // 2
                    for (let i = cal; i >= 0; i -= 2) {
                        console.log('I', i)
                        html += '</' + tag + ' wow>'
                        if (ref[--cursor]?.depth === lexicalBlocks[1]?.depth) {
                            break
                        }
                    }

                    generate(lexicalBlocks)
                    cursor--
                    continue
                }
                // lexicalBlocks.shift()
                // generate(lexicalBlocks)
                // cursor--
                html += '</' + tag + ' meow>'
                // continue
            }

            html += '</' + tag + ' peow>'

            lexicalBlocks.shift()
            continue
        }

        lexicalBlocks.shift()
    }

    return html
}

export default generate
