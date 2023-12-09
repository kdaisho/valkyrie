import {
    isPoundKey,
    isLineBreak,
    isWhitespace,
    isLetter,
    isHyphen,
    isNumber,
    isDot,
} from './identity'
import { peek, pop } from './utils'

export default function (input: string) {
    const chars = input.split('')
    let tokens = []
    const lexicalBlocks = []

    while (chars.length) {
        if (isLineBreak(chars[0])) {
            pop(chars)

            if (tokens.length) {
                lexicalBlocks.push(tokens)
                tokens = []
            }

            continue
        }

        if (isPoundKey(chars[0])) {
            let symbol = chars[0]
            let value = ''
            pop(chars)

            while (isPoundKey(chars[0])) {
                symbol += chars[0]
                pop(chars)
            }

            while (!isLineBreak(chars[0])) {
                value += chars[0]
                pop(chars)
            }

            tokens.push({
                type: 'Heading',
                value: symbol,
            })

            tokens.push({
                type: 'Text',
                value: value.trim(),
            })

            continue
        }

        if (isHyphen(chars[0])) {
            const value = chars[0]
            pop(chars)

            while (isWhitespace(peek(chars))) {
                pop(chars)
            }

            tokens.push({
                type: 'List',
                value,
            })

            continue
        }

        if (isWhitespace(chars[0])) {
            pop(chars)
        }

        if (isNumber(chars[0])) {
            let symbol = chars[0]
            let value = ''
            pop(chars)

            while (isNumber(chars[0])) {
                symbol += chars[0]
                pop(chars)
            }

            while (isDot(chars[0]) || isWhitespace(chars[0])) {
                pop(chars)
            }

            tokens.push({
                type: 'Number',
                value: symbol,
            })

            while (!isLineBreak(chars[0])) {
                value += chars[0]
                pop(chars)
            }

            tokens.push({
                type: 'Text',
                value,
            })

            continue
        }

        if (isLetter(chars[0])) {
            let value = chars[0].trim()
            pop(chars)

            while (!isLineBreak(chars[0])) {
                value += chars[0]
                pop(chars)
            }

            tokens.push({
                type: 'Text',
                value,
            })

            continue
        }

        throw new Error(`tokenize: ${chars[0]} is not valid`)
    }

    return lexicalBlocks
}
