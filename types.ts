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

export type ListItem = {
    type: 'ListItem'
    children: (List | Anchor | Text)[]
}

export type Whiteline = {
    type: 'Whiteline'
}

// without text
// (https://google.com) -> <a href="https://google.com">https://google.com</a>

// with text
// [Google](https://google.com) -> <a href="https://google.com">Google</a>
export type Anchor = {
    type: 'Anchor'
    href: `https://${string}` | `http://${string}`
    text?: string
}

export type AST = (Heading | List | Anchor | Paragraph | Text)[]

export type Node =
    | Heading
    | List
    | ListItem
    | Anchor
    | Paragraph
    | Text
    | Whiteline

export type Token =
    | {
          type: 'Heading'
          value: string
      }
    | {
          type: 'List'
          value: string
          depth: number
      }
    | {
          type: 'Paragraph'
      }
    | {
          type: 'Text'
          value: string
      }
    | {
          type: 'Whiteline'
      }
    | {
          type: 'Anchor'
          href: `https://${string}` | `http://${string}`
          text?: string
      }
