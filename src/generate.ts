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
            console.log('==>', 'LIST LOOP')
            ref.push(lexicalBlocks[0])
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

            console.log('==> MORE?', lexicalBlocks[1])

            while (lexicalBlocks[1]?.type === 'List') {
                const cal = ref[cursor]?.depth - lexicalBlocks[1]?.depth

                console.log('==> CAL', cal)

                lexicalBlocks.shift()

                if (cal < 0) {
                    _c = 1
                    console.log('==> Case 1')

                    const yo = generate(lexicalBlocks)
                    console.log('==> YO', yo) // good

                    html = yo
                    html += '</' + tag + ' wow1>'
                    return html
                    continue
                }
                if (cal === 0) {
                    _c = 2
                    console.log('==> Case 2')

                    html +=
                        '<li>' + lexicalBlocks[0].children[0].value + '</li>'

                    html += '</' + tag + ' wow22>'
                    return html
                    continue
                }
                if (cal > 0) {
                    _c = 3
                    console.log('==> Case 3')

                    for (let i = cal; i >= 0; i -= 2) {
                        console.log('I', i)

                        html += '</' + tag + ' wow3>'
                        if (ref[--cursor]?.depth === lexicalBlocks[1]?.depth) {
                            break
                        }
                    }

                    const yo2 = generate(lexicalBlocks)
                    console.log('==> YO2', yo2)

                    // html += '</' + tag + ' wow3.5>'
                    html = yo2
                    return html

                    cursor--
                    continue
                }

                html += '</' + tag + ' xxxx>'
            }

            console.log('==> _c??', _c)

            if (_c === 1) {
                html += '</' + tag + ' zzzz>'
            }

            return html

            console.log('==> CASE?', _c)
            console.count('WHAT')

            // if (_c === 2 || _c === 1) {
            //     html += '</' + tag + ' zzzz>'
            // }
            // lexicalBlocks.shift()
            // continue
        }

        lexicalBlocks.shift()
    }

    return html
}

export default generate
