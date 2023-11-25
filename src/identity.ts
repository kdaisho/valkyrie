const POUND_KEY = '#'
const LINE_BREAK = '\n'
const LETTER = /[a-z]/i
const WHITESPACE = /\s+/
const NUMBER = /^[0-9]+$/

export const isPoundKey = (char: string) => char === POUND_KEY

export const isLineBreak = (char: string) => char === LINE_BREAK

export const isLetter = (char: string) => LETTER.test(char)

export const isWhitespace = (char?: string) => {
    if (char === undefined) return false
    return WHITESPACE.test(char)
}

export const isNumber = (char: string) => NUMBER.test(char)

export const isWord = (char: string) => isLetter(char) || isNumber(char)
