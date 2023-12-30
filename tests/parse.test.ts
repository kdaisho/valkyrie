import parse from '../src/parse'
import { Token } from '../types'

describe('parse', () => {
    let input = [] as Token[][]

    it('should return an array', () => {
        input = []
        expect(parse(input)).toEqual([])
    })

    it('should parse a heading', () => {
        input = [
            [
                { type: 'Heading', value: '#' },
                { type: 'Text', value: 'This is a test.' },
            ],
        ]
        const result = [
            {
                type: 'Heading',
                value: '#',
                children: [{ type: 'Text', value: 'This is a test.' }],
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse a heading with a link', () => {
        input = [
            [
                { type: 'Heading', value: '#' },
                { type: 'Text', value: 'The link: ' },
                {
                    type: 'Anchor',
                    text: 'Example',
                    href: 'https://example.com',
                },
            ],
        ]
        const result = [
            {
                type: 'Heading',
                value: '#',
                children: [
                    { type: 'Text', value: 'The link: ' },
                    {
                        type: 'Anchor',
                        text: 'Example',
                        href: 'https://example.com',
                    },
                ],
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse a paragraph', () => {
        input = [
            [{ type: 'Paragraph' }, { type: 'Text', value: 'This is a test.' }],
        ]
        const result = [
            {
                type: 'Paragraph',
                children: [{ type: 'Text', value: 'This is a test.' }],
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse a paragraph with a link', () => {
        input = [
            [
                { type: 'Paragraph' },
                { type: 'Text', value: 'The link: ' },
                {
                    type: 'Anchor',
                    text: 'Example',
                    href: 'https://example.com',
                },
            ],
        ]
        const result = [
            {
                type: 'Paragraph',
                children: [
                    { type: 'Text', value: 'The link: ' },
                    {
                        type: 'Anchor',
                        text: 'Example',
                        href: 'https://example.com',
                    },
                ],
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse a list', () => {
        input = [
            [
                { type: 'List', value: '-', depth: 0 },
                { type: 'Text', value: 'One' },
            ],
            [
                { type: 'List', value: '-', depth: 2 },
                { type: 'Text', value: 'Two' },
            ],
        ]
        const result = [
            {
                type: 'List',
                value: '-',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [{ type: 'Text', value: 'One' }],
                    },
                ],
            },
            {
                type: 'List',
                value: '-',
                depth: 2,
                children: [
                    {
                        type: 'ListItem',
                        children: [{ type: 'Text', value: 'Two' }],
                    },
                ],
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse an ordered list', () => {
        input = [
            [
                { type: 'OrderedList', value: '1' },
                { type: 'Text', value: 'This is a test.' },
            ],
        ]
        const result = [
            {
                type: 'OrderedList',
                value: '1',
                children: [
                    {
                        type: 'ListItem',
                        children: [{ type: 'Text', value: 'This is a test.' }],
                    },
                ],
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse an anchor', () => {
        input = [[{ type: 'Anchor', href: 'https://example.com' }]]
        const result = [
            {
                type: 'Anchor',
                href: 'https://example.com',
            },
        ]

        expect(parse(input)).toEqual(result)
    })

    it('should parse an anchor with text', () => {
        input = [
            [
                {
                    type: 'Anchor',
                    text: 'Example',
                    href: 'https://example.com',
                },
            ],
        ]
        const result = [
            {
                type: 'Anchor',
                text: 'Example',
                href: 'https://example.com',
            },
        ]

        expect(parse(input)).toEqual(result)
    })
})
