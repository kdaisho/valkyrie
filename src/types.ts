export type Heading = {
    type: 'Heading'
    value: string
    children: Text[]
}

export type Paragraph = {
    type: 'Paragraph'
    children: (Text | Anchor)[]
}

export type Text = {
    type: 'Text'
    value: string
}

export type List = {
    type: 'List'
    value: string
    depth: number
    children: (List | ListItem)[]
}

export type OrderedList = {
    type: 'OrderedList'
    value: string
    children: (List | ListItem)[]
}

export type ListItem = {
    type: 'ListItem'
    children: (List | Anchor | Text)[]
}

export type Whiteline = {
    type: 'Whiteline'
}

// without value
// (https://google.com) -> <a href="https://google.com">https://google.com</a>

// with value
// [Google](https://google.com) -> <a href="https://google.com">Google</a>
export type Anchor = {
    type: 'Anchor'
    href: `https://${string}` | `http://${string}`
    text?: string // link text
}

// samples
// const heading = {
//     type: 'Heading',
//     value: '##',
//     children: [
//         {
//             type: 'Text',
//             value: 'Hello ',
//         },
//         {
//             type: 'Anchor',
//             value: 'Google',
//             href: 'https://google.com',
//         },
//         {
//             type: 'Text',
//             value: ' world',
//         },
//     ],
// }

// Hi [Goo](https://goo.com) main.

// const textTokens = [
//     {
//         type: 'Paragraph',
//     },
//     {
//         type: 'Text',
//         value: 'Hi',
//     },
//     {
//         type: 'Anchor',
//         text: 'Google',
//         href: 'https://google.com',
//     },
//     {
//         type: 'Text',
//         value: 'man',
//     },
// ]

// const text = {
//     type: 'Paragraph',
//     children: [
//         {
//             type: 'Text',
//             value: 'Check out ',
//         },
//         {
//             type: 'Anchor',
//             value: 'Yahoo',
//             href: 'https://yahoo.com',
//         },
//         {
//             type: 'Text',
//             value: ' and watch.',
//         },
//     ],
// }
