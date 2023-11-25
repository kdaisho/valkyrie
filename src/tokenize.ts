import {
    isPoundKey,
    isLineBreak,
    isWhitespace,
    isWord,
    // isLetter,
    // isNumber
} from './identity'
// import { peek, pop } from './utils'

export const tokenize = (input: string) => {
    let cursor = 0

    const tokens = []

    while (cursor < input.length) {
        if (isPoundKey(input[cursor])) {
            let symbol = input[cursor]

            cursor++

            while (isPoundKey(input[cursor])) {
                symbol += input[cursor]
                cursor++

                if (isWhitespace(input[cursor])) {
                    console.log('==>', 'current is whitespace so # is ending')
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
            console.log('==>', '======================== LINE BREAK')
            cursor++
            continue
        }

        if (
            isWord(input[cursor]) ||
            (input[cursor - 1] !== '#' && isWhitespace(input[cursor]))
        ) {
            let value = ''
            value += input[cursor]
            cursor++

            while (
                (isWord(input[cursor]) || isWhitespace(input[cursor])) &&
                !isLineBreak(input[cursor])
            ) {
                value += input[cursor]
                cursor++
            }

            tokens.push({
                type: 'Body',
                value,
            })

            continue
        }

        throw new Error(`tokenize: ${input[cursor]} is not valid`)
    }

    return tokens
}
