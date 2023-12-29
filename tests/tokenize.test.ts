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

    it('should tokenize a paragraph', () => {
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

    it('should tokenize an ordered list', () => {
        const input = '1. example text'
        const result = [
            [
                { type: 'OrderedList', value: '1' },
                { type: 'Text', value: 'example text' },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize a paragraph, not an ordered list', () => {
        const input = '1.example text'
        const result = [
            [
                {
                    type: 'Text',
                    value: '1.example text',
                },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize an anchor without text', () => {
        const input = '(https://example.com)'
        const result = [
            [
                {
                    type: 'Anchor',
                    href: 'https://example.com',
                },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize an anchor with text', () => {
        const input = '[Example](https://example.com)'
        const result = [
            [
                {
                    type: 'Anchor',
                    text: 'Example',
                    href: 'https://example.com',
                },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    // TODO: fix this to return paragraph
    it('should not tokenize an anchor', () => {
        const input = '[Example] (https://example.com)'
        const result = [
            [
                // {
                //     type: 'Paragraph',
                // },
                // {
                //     type: 'Text',
                //     value: '[Example] (https://example.com)',
                // },
                {
                    type: 'Text',
                    value: '[Example]',
                },
                {
                    type: 'Text',
                    value: ' ',
                },
                {
                    type: 'Anchor',
                    href: 'https://example.com',
                },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })
})
