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
    let indentation = 0
    let tokens = []
    const lexicalBlocks = []

    while (chars.length) {
        if (indentation >= 2) {
            indentation = 0

            tokens.push({
                type: 'Indentation',
                value: indentation,
            })

            continue
        }

        if (isLineBreak(chars[0])) {
            pop(chars)

            if (indentation >= 2) {
                tokens.push({
                    type: 'Indentation',
                    value: indentation,
                })
                indentation = 0
            }

            if (tokens.length) {
                lexicalBlocks.push(tokens)
                tokens = []
            }

            continue
        }

        if (isWhitespace(chars[0])) {
            indentation++
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
                    type: 'Number',
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
                value,
            })

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

    console.log('==> LEXICAL BLOCKS', lexicalBlocks)

    return lexicalBlocks
}
