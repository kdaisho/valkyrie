/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, List } from './types'

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
        .trim()
}

export function buildListHtml(nodes: (Text | List)[]) {
    let html = ''

    nodes.forEach(_ => {
        if (_.type === 'Text') {
            html += '<li>' + getTextBody(_.value) + '</li>'
        }

        if (_.type === 'List') {
            const list = _ as List
            const { children } = list

            html += '<ul>' + buildListHtml(children) + '</ul>'
        }
    })

    return html
}
