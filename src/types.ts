export type Heading = {
    type: string
    value: string
    children: Text[]
}

export type Text = {
    type: string
    value: string
}

export type List = {
    type: 'List'
    depth: number
    children: (Text | List)[]
}
