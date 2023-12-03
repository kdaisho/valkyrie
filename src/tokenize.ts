import {
    isPoundKey,
    isLineBreak,
    isWhitespace,
    isWord,
    isHyphen,
    // isLetter,
    // isNumber
} from './identity'
// import { peek, pop } from './utils'

export default function (input: string) {
    let cursor = 0
    let col = 0
    let tokens = []
    const tokenCollections = []

    while (cursor < input.length) {
        console.log('==> LOOP', { current: input[cursor], col })

        if (isPoundKey(input[cursor])) {
            let symbol = input[cursor]
            cursor++
            col++

            if (isWhitespace(input[cursor])) {
                cursor++
                col++
            }

            while (isPoundKey(input[cursor])) {
                symbol += input[cursor]
                cursor++
                col++

                if (isWhitespace(input[cursor])) {
                    cursor++
                    col++
                }
            }

            tokens.push({
                type: 'Heading',
                value: symbol,
            })

            continue
        }

        if (isLineBreak(input[cursor])) {
            cursor++
            col = 0

            if (tokens.length) {
                tokenCollections.push(tokens)
                tokens = []
            }

            continue
        }

        if (isWord(input[cursor]) || isWhitespace(input[cursor])) {
            console.log('==> WORD', { current: input[cursor] })

            let value = ''
            value += input[cursor].trim()
            cursor++

            while (
                (isWord(input[cursor]) || isWhitespace(input[cursor])) &&
                !isLineBreak(input[cursor])
            ) {
                console.log('==> WORD INSIDE', { current: input[cursor] })
                value += input[cursor]
                cursor++
                col++
            }

            console.log('==> WORD OUTSIDE', { current: input[cursor] })

            tokens.push({
                type: 'Text',
                value,
            })

            console.log('==> WORD DONE', tokens)

            continue
        }

        if (col === 0 && isHyphen(input[cursor])) {
            console.log('==>', 'LIST FOUND')
            let value = ''
            value += input[cursor]

            cursor++
            col++

            while (isWhitespace(input[cursor + 1])) {
                console.log('==> YES', cursor)
                cursor++
                col++
            }

            console.log('==> NOW one', { current: input[cursor] })
            console.log('==> NOW two', cursor)

            tokens.push({
                type: 'List',
                value,
            })

            console.log('==> TOKENS', tokens)
            continue
        }

        throw new Error(`tokenize: ${input[cursor]} is not valid`)
    }

    console.log('==> COLLECTION', tokenCollections)

    return tokenCollections
}
