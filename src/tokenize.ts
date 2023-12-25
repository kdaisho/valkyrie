import {
    isPoundKey,
    isLineBreak,
    isWhitespace,
    isHyphen,
    isNumber,
    isDot,
    isCharacter,
} from './identity'
import { peek, pop } from './utils'

export default function (input: string) {
    const chars = input.split('')
    let depth = 0
    let tokens = []
    const lexicalBlocks = []

    while (chars.length) {
        if (isLineBreak(chars[0])) {
            depth = 0

            if (tokens.length) {
                lexicalBlocks.push(tokens)
                tokens = []
            }

            if (peek(chars) === '\n') {
                // double newline means a whiteline
                lexicalBlocks.push([
                    {
                        type: 'Whiteline',
                    },
                ])
            }

            pop(chars)
            continue
        }

        if (isWhitespace(chars[0])) {
            depth++
            pop(chars)

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

        if (isHyphen(chars[0]) && isWhitespace(peek(chars))) {
            const symbol = chars[0]
            pop(chars)

            while (isWhitespace(chars[0])) {
                pop(chars)
            }

            tokens.push({
                type: 'List',
                value: symbol,
                depth,
            })

            continue
        }

        if (isNumber(chars[0])) {
            let symbol = chars[0]
            let value = ''
            pop(chars)

            while (isNumber(chars[0])) {
                symbol += chars[0]
                pop(chars)
            }

            let isList = false

            while (isDot(chars[0]) && isWhitespace(peek(chars))) {
                isList = true
                pop(chars)
            }

            if (isList) {
                tokens.push({
                    type: 'OrderedList',
                    value: symbol,
                })
            } else {
                value += symbol
            }

            while (!isLineBreak(chars[0]) && chars.length) {
                value += chars[0]
                pop(chars)
            }

            tokens.push({
                type: 'Text',
                value: value.trim(),
            })

            continue
        }

        if (
            chars[0] === '<' &&
            chars[1] === '!' &&
            chars[2] === '-' &&
            chars[3] === '-'
        ) {
            while (
                chars.length &&
                !(
                    (chars[0] as string) === '-' &&
                    (chars[1] as string) === '-' &&
                    (chars[2] as string) === '>'
                )
            ) {
                pop(chars)
            }

            pop(chars, 3)

            continue
        }

        if (isCharacter(chars[0])) {
            let value = chars[0]
            pop(chars)

            while (!isLineBreak(chars[0]) && chars.length) {
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

    if (!chars.length && tokens.length) {
        lexicalBlocks.push(tokens)
        tokens = []
    }

    return lexicalBlocks
}
