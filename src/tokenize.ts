import {
    isPoundKey,
    isLineBreak,
    isWhitespace,
    isWord,
    isHyphen,
    isNumber,
} from './identity'
import { peek, pop } from './utils'

export default function (input: string) {
    const chars = input.split('')
    let tokens = []
    const ast = []

    while (chars.length) {
        if (isLineBreak(chars[0])) {
            pop(chars)

            if (tokens.length) {
                ast.push(tokens)
                tokens = []
            }

            continue
        }

        if (isPoundKey(chars[0])) {
            let symbol = chars[0]
            pop(chars)

            if (isWhitespace(chars[0])) {
                pop(chars)
            }

            while (isPoundKey(chars[0])) {
                symbol += chars[0]
                pop(chars)

                if (isWhitespace(chars[0])) {
                    pop(chars)
                }
            }

            tokens.push({
                type: 'Heading',
                value: symbol,
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
            let value = chars[0]
            let c = ''
            pop(chars)

            while (isNumber(chars[0])) {
                value += chars[0]
                pop(chars)
            }

            while (chars[0] === '.' || isWhitespace(chars[0])) {
                pop(chars)
            }

            tokens.push({
                type: 'Number',
                value,
            })

            while (!isLineBreak(chars[0])) {
                c += chars[0]
                pop(chars)
            }

            tokens.push({
                type: 'Text',
                value: c,
            })

            continue
        }

        if (isWord(chars[0])) {
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

    return ast
}
