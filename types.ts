export type Heading = {
    type: 'Heading'
    symbol: string
    children: Text[]
}

export type Paragraph = {
    type: 'Paragraph'
    children: (Text | URL)[]
}

export type Text = {
    type: 'Text'
    value: string
}

export type List = {
    type: 'List'
    symbol: string
    depth: number
    children: (List | ListItem)[]
}

export type ListItem = {
    type: 'ListItem'
    children: (List | URL | Text)[]
}

export type Whiteline = {
    type: 'Whiteline'
}

// without text
// (https://google.com) -> <a href="https://google.com">https://google.com</a>

// with text
// [Google](https://google.com) -> <a href="https://google.com">Google</a>
export type URL = {
    type: 'URL'
    href: `https://${string}` | `http://${string}`
    text?: string
}

export type Image = {
    type: 'Image'
    symbol: string
    children: URL[]
}

export type AST = (Heading | Image | List | URL | Paragraph | Text)[]

export type Node =
    | Heading
    | Image
    | List
    | ListItem
    | URL
    | Paragraph
    | Text
    | Whiteline

export type Token =
    | {
          type: 'Heading'
          symbol: string
      }
    | {
          type: 'Image'
          symbol: string
      }
    | {
          type: 'List'
          symbol: string
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
          type: 'URL'
          href: `https://${string}` | `http://${string}`
          text?: string
      }
