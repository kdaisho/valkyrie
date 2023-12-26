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
    children: (Text | List)[]
}

export type OrderedList = {
    type: 'OrderedList'
    value: string
    children: Text[]
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
