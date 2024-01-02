import tokenize from '../src/tokenize'

describe('tokenize', () => {
    it('should return an array', () => {
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
                { type: 'Heading', symbol: '#' },
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
                { type: 'List', symbol: '1', depth: 0 },
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

    it('should tokenize an unordered list', () => {
        const input = '- example text'
        const result = [
            [
                { type: 'List', symbol: '-', depth: 0 },
                { type: 'Text', value: 'example text' },
            ],
        ]

        expect(tokenize(input)).toEqual(result)
    })

    it('should tokenize a paragraph', () => {
        const input = '-example text'
        const result = [
            [{ type: 'Paragraph' }, { type: 'Text', value: '-example text' }],
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

    it('should tokenize a paragraph and an anchor without text', () => {
        const input = '[Example] (https://example.com)'
        const result = [
            [
                {
                    type: 'Paragraph',
                },
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

    it('should not tokenize a single line comment', () => {
        const input = '<!-- This is a comment -->'
        const result: string[] = []

        expect(tokenize(input)).toEqual(result)
    })

    it('should not tokenize a multiline comment', () => {
        const input = `<!-- hello
            this is
            multiline
            comments -->`
        const result: string[] = []

        expect(tokenize(input)).toEqual(result)
    })
})
