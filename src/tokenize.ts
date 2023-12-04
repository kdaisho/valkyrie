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
    let tokens = []
    const tokenCollections = []

    while (cursor < input.length) {
        if (isPoundKey(input[cursor])) {
            let symbol = input[cursor]
            cursor++

            if (isWhitespace(input[cursor])) {
                cursor++
            }

            while (isPoundKey(input[cursor])) {
                symbol += input[cursor]
                cursor++

                if (isWhitespace(input[cursor])) {
                    cursor++
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

            while (isWhitespace(input[cursor + 1])) {
                cursor++
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
