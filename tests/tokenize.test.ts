import tokenize from '../src/tokenize'

describe('tokenize', () => {
    it('should return an array', () => {
        console.log('==> test', tokenize(''))
        expect(Array.isArray(tokenize(''))).toBe(true)
    })

    it('should ignore whitespace', () => {
        const input = '                  '
        const result: string[] = []

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize a whiteline', () => {
        const input = '\n\n'
        const result = [[{ type: 'Whiteline' }]]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize a heading', () => {
        const input = '# This is a test.'
        const result = [
            [
                { type: 'Heading', value: '#' },
                { type: 'Text', value: 'This is a test.' },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize a text', () => {
        const input = '#This example.'
        const result = [
            [{ type: 'Paragraph' }, { type: 'Text', value: '#This example.' }],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize a single line text', () => {
        const input = 'example text'
        const result = [
            [{ type: 'Paragraph' }, { type: 'Text', value: 'example text' }],
        ]

        expect(tokenize(input)).toEqual(result)
    })
})
