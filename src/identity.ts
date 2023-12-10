const POUND_KEY = '#'
const LINE_BREAK = '\n'
const WHITESPACE = /\s+/
const LETTER = /[a-z]/i
const NUMBER = /\d+/
const SPECIAL_CHARACTERS = /^[_@$%&'",!?;:()[\]\-*]+$/
const HYPHEN = '-'
const DOT = '.'

export const isPoundKey = (char: string) => char === POUND_KEY

export const isLineBreak = (char: string) => char === LINE_BREAK

export const isWhitespace = (char?: string) => {
    if (char === undefined) return false
    return WHITESPACE.test(char)
}

export const isLetter = (char: string) => LETTER.test(char)

export const isNumber = (char: string) => NUMBER.test(char)

export const isSpecialCharacters = (char: string) =>
    SPECIAL_CHARACTERS.test(char)

export const isDot = (char: string) => char === DOT

export const isHyphen = (char: string) => char === HYPHEN

export const isCharacter = (char: string) =>
    isLetter(char) || isNumber(char) || isSpecialCharacters(char)
