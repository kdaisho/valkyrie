import traverse from '../src/traverse'
import { Node } from '../types'

describe('traverse', () => {
    let input = [] as Node[]

    it('should return a nested list', () => {
        input = [
            {
                type: 'List',
                value: '-',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'one',
                            },
                        ],
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
                        children: [
                            {
                                type: 'Text',
                                value: 'two',
                            },
                        ],
                    },
                ],
            },
        ]

        const result = [
            {
                type: 'List',
                value: '-',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'one',
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
                                children: [
                                    {
                                        type: 'Text',
                                        value: 'two',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]

        expect(traverse(input)).toEqual(result)
    })

    it('should return a flat ordered list', () => {
        input = [
            {
                type: 'List',
                value: '1',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'one',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'List',
                value: '2',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'two',
                            },
                        ],
                    },
                ],
            },
        ]

        const result = [
            {
                type: 'List',
                value: '1',
                depth: 0,
                children: [
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'one',
                            },
                        ],
                    },
                    {
                        type: 'ListItem',
                        children: [
                            {
                                type: 'Text',
                                value: 'two',
                            },
                        ],
                    },
                ],
            },
        ]

        expect(traverse(input)).toEqual(result)
    })
})
