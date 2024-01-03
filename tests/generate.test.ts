import generate from '../src/generate'
import { AST } from '../types'

describe('generate', () => {
    let input = [] as AST

    it('should generate <h1>', () => {
        input = [
            {
                type: 'Heading',
                symbol: '#',
                children: [
                    {
                        type: 'Text',
                        value: 'Sample title',
                    },
                ],
            },
        ]

        expect(generate(input)).toBe('<h1>Sample title</h1>')
    })

    it('should generate <p>', () => {
        input = [
            {
                type: 'Paragraph',
                children: [
                    {
                        type: 'Text',
                        value: 'Sample text',
                    },
                ],
            },
        ]

        expect(generate(input)).toBe('<p>Sample text</p>')
    })

    it('should generate flat <ul>', () => {
        input = [
            {
                type: 'List',
                symbol: '-',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'Item one',
                            },
                        ],
                    },
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'Item two',
                            },
                        ],
                    },
                ],
            },
        ]

        expect(generate(input)).toBe(
            '<ul><li>Item one</li><li>Item two</li></ul>'
        )
    })

    it('should generate nested <ul>', () => {
        input = [
            {
                type: 'List',
                symbol: '-',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'Item one',
                            },
                            {
                                type: 'List',
                                symbol: '-',
                                depth: 2,
                                children: [
                                    {
                                        type: 'ListItem',
                                        children: [
                                            {
                                                type: 'Text',
                                                value: 'Item two',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]

        expect(generate(input)).toBe(
            '<ul><li>Item one<ul><li>Item two</li></ul></li></ul>'
        )
    })

    it('should generate flat <ol>', () => {
        input = [
            {
                type: 'List',
                symbol: '10',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'Item one',
                            },
                        ],
                    },
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'Item two',
                            },
                        ],
                    },
                ],
            },
        ]

        expect(generate(input)).toBe(
            '<ol start="10"><li>Item one</li><li>Item two</li></ol>'
        )
    })

    it('should generate <a>', () => {
        input = [
            {
                type: 'Anchor',
                href: 'https://google.com',
            },
        ]

        expect(generate(input)).toBe(
            '<a href="https://google.com">https://google.com</a>'
        )
    })

    it('should generate <a> within <p>', () => {
        input = [
            {
                type: 'Paragraph',
                children: [
                    {
                        type: 'Text',
                        value: 'This is a link to ',
                    },
                    {
                        type: 'Anchor',
                        text: 'Google',
                        href: 'https://google.com',
                    },
                    {
                        type: 'Text',
                        value: '.',
                    },
                ],
            },
        ]

        expect(generate(input)).toBe(
            '<p>This is a link to <a href="https://google.com">Google</a>.</p>'
        )
    })

    it('should generate <a> with text', () => {
        input = [
            {
                type: 'Anchor',
                text: 'Google',
                href: 'https://google.com',
            },
        ]

        expect(generate(input)).toBe('<a href="https://google.com">Google</a>')
    })

    it('should generate <a> as a list item', () => {
        input = [
            {
                type: 'List',
                symbol: '-',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'Item one: ',
                            },
                            {
                                type: 'Anchor',
                                text: 'Google',
                                href: 'https://google.com',
                            },
                            {
                                type: 'Text',
                                value: ' is a search engine',
                            },
                        ],
                    },
                ],
            },
        ]

        expect(generate(input)).toBe(
            '<ul><li>Item one: <a href="https://google.com">Google</a> is a search engine</li></ul>'
        )
    })
})
