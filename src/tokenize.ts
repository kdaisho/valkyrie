import {
    isPoundKey,
    isLineBreak,
    isWhitespace,
    isHyphen,
    isNumber,
    isDot,
    isCharacter,
    isOpeningSquareBracket,
    isOpeningBracket,
} from './identity'
import { peek, pop } from './utils'

export default function (input: string) {
    const chars = input.split('')
    let depth = 0
    let tokens = []
    const LexicalRepresentation = []

    while (chars.length) {
        if (isLineBreak(chars[0])) {
            depth = 0

            if (tokens.length) {
                LexicalRepresentation.push(tokens)
                tokens = []
            }

            if (peek(chars) === '\n') {
                // two consecutive newline characters mean a whiteline
                LexicalRepresentation.push([
                    {
                        type: 'Whiteline',
                    },
                ])
            }

            pop(chars)
            continue
        }

        if (isWhitespace(chars[0]) && !tokens.length) {
            depth++
            pop(chars)

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
                pop(chars, 2)
            }

            if (isList) {
                tokens.push({
                    type: 'List',
                    value: symbol,
                    depth,
                })
            } else {
                value += symbol
                while (!isLineBreak(chars[0]) && chars.length) {
                    value += chars[0]
                    pop(chars)
                }

                tokens.push({
                    type: 'Text',
                    value: value.trim(),
                })
            }

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

        // Paragraph or Heading
        if (isWhitespace(chars[0]) || isCharacter(chars[0])) {
            let symbol = ''

            while (isPoundKey(chars[0])) {
                symbol += chars[0]
                pop(chars)
            }

            if (symbol && isWhitespace(chars[0])) {
                pop(chars)
                tokens.push({
                    type: 'Heading',
                    value: symbol,
                })

                continue
            }

            let value = symbol + chars[0]
            pop(chars)

            if (!tokens.length) {
                tokens.push({
                    type: 'Paragraph',
                })
            }

            while (
                chars.length &&
                !isOpeningBracket(chars[0]) &&
                !isOpeningSquareBracket(chars[0]) &&
                !isLineBreak(chars[0])
            ) {
                value += chars[0]
                pop(chars)
            }

            tokens.push({
                type: 'Text',
                value,
            })

            continue
        }

        // Anchor without value (https://google.com)
        if (isOpeningBracket(chars[0])) {
            let href = ''
            pop(chars)

            while (chars.length && chars[0] !== ')') {
                href += chars[0]
                pop(chars)
            }

            if (chars.length) {
                pop(chars)
            }

            if (href.startsWith('http://') || href.startsWith('https://')) {
                tokens.push({
                    type: 'Anchor',
                    href,
                })

                continue
            } else {
                tokens.push({
                    type: 'Text',
                    value: '(' + href + ')',
                })

                continue
            }
        }

        // Anchor with value [Google](https://google.com)
        if (isOpeningSquareBracket(chars[0])) {
            let text = chars[0]
            let href = ''
            pop(chars)

            while (chars.length && chars[0] !== ']') {
                text += chars[0]
                pop(chars)
            }

            if (chars.length) {
                text += chars[0]
                pop(chars)
            }

            if (isOpeningBracket(chars[0])) {
                pop(chars)

                while (chars.length && chars[0] !== ')') {
                    href += chars[0]
                    pop(chars)
                }

                if (chars.length) {
                    pop(chars)
                }
            } else {
                tokens.push({
                    type: 'Paragraph',
                })
                tokens.push({
                    type: 'Text',
                    value: text,
                })

                continue
            }

            tokens.push({
                type: 'Anchor',
                text: text.slice(1, -1),
                href,
            })

            continue
        }

        throw new Error(`tokenize: ${chars[0]} is not valid`)
    }

    if (!chars.length && tokens.length) {
        LexicalRepresentation.push(tokens)
        tokens = []
    }

    // console.log('==> lexer', LexicalRepresentation)

    return LexicalRepresentation
}
