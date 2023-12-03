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

        if (isHyphen(input[cursor])) {
            let value = ''
            value += input[cursor]
            cursor++
            col++

            while (isWhitespace(input[cursor + 1])) {
                cursor++
                col++
            }

            tokens.push({
                type: 'List',
                value,
            })

            continue
        }

        if (isWord(input[cursor]) || isWhitespace(input[cursor])) {
            let value = ''
            value += input[cursor].trim()
            cursor++

            while (
                (isWord(input[cursor]) || isWhitespace(input[cursor])) &&
                !isLineBreak(input[cursor])
            ) {
                value += input[cursor]
                cursor++
                col++
            }

            tokens.push({
                type: 'Text',
                value,
            })

            continue
        }

        throw new Error(`tokenize: ${input[cursor]} is not valid`)
    }

    return tokenCollections
}
