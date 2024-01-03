/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anchor, List, ListItem, Text } from '../types'

export const pipe =
    (...fns: ((v: any) => any)[]) =>
    (value: any) =>
        fns.reduce((acc, fn) => fn(acc), value)

export const peek = (arr: string[]) => arr[1]

export const pop = (arr: string[], count: number = 1) => {
    arr.splice(0, count)
}

export const getTextBody = (value: string) => {
    return value
        .replace(/(\*\*|__)(?=\S)([^*_]+?)(?<=\S)\1/g, '<strong>$2</strong>')
        .replace(/<!--.*?-->/g, '')
        .replace(/\s{2,}/g, ' ')
}

export function buildListHtml(nodes: (List | ListItem | Text | Anchor)[]) {
    let html = ''

    while (nodes.length) {
        const _node = nodes[0] as ListItem

        html += '<li>'

        _node.children.forEach(n => {
            if (n.type === 'Text') {
                html += getTextBody(n.value)
            }

            if (n.type === 'Anchor') {
                html +=
                    `<a href="${n.href}">` +
                    getTextBody(n.text ?? n.href) +
                    '</a>'
            }

            if (n.type === 'List') {
                html += n.symbol === '-' ? '<ul>' : `<ol start="${n.symbol}">`
                html += buildListHtml(n.children)
                html += n.symbol === '-' ? '</ul>' : '</ol>'
            }
        })

        html += '</li>'
        nodes.shift()
    }

    return html
}
