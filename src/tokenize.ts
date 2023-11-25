import {
    isPoundKey,
    // isLineBreak,
    // isLetter,
    // isWhitespace,
    // isNumber
} from './identity'

export const tokenize = (input: string) => {
    const tokens = []
    let cursor = 0

    while (cursor < input.length) {
        const char = input[cursor]

        if (isPoundKey(char)) {
            tokens.push({
                type: 'PoundKey',
                value: char,
            })
            cursor++
            continue
        }

        throw new Error(`tokenize: ${char} is not valid`)
    }

    return tokens
}
