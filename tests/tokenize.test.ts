import tokenize from '../src/tokenize'

describe('tokenize', () => {
    it('should return an array', () => {
        console.log('==> test', tokenize(''))
        expect(Array.isArray(tokenize(''))).toBe(true)
    })

    it('should be able to tokenize a single line text', () => {
        const input = 'example text'
        const result = [
            [{ type: 'Paragraph' }, { type: 'Text', value: 'example text' }],
        ]

        expect(tokenize(input)).toEqual(result)
    })
})
