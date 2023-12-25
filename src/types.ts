export type Heading = {
    type: 'Heading'
    value: string
    children: Text[]
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
