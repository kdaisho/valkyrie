/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, ListItem } from './types'

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

export function buildListHtml(nodes: (List | ListItem)[]) {
    console.log('==> utils nodes', nodes)
    let html = ''

    nodes.forEach(n => {
        console.log('==> N', n)

        if (n.type === 'List') {
            console.log('==> WOW _4', n)
            html += '<ul>' + buildListHtml(n.children) + '</ul>'
            return
        }

        html += '<li>'

        n.children.forEach(_ => {
            console.log('==> WOW1', _)

            if (_.type === 'Text') {
                html += getTextBody(_.value)
            }

            if (_.type === 'Anchor') {
                html +=
                    `<a href="${_.href}">` +
                    getTextBody(_.text ?? _.href) +
                    '</a>'
            }
        })
        html += '</li>'
    })

    console.log('==> HTML', html)

    return html
}
