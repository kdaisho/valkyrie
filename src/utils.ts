/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anchor, List, ListItem, OrderedList, Text } from '../types'

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

export function buildListHtml(
    // nodes: (List | OrderedList | ListItem | Text | Anchor)[]
    nodes: (List | OrderedList | ListItem)[]
) {
    let html = ''

    // console.log('==>', 1000, nodes)

    nodes.forEach(n => {
        if (n.type === 'List') {
            html += '<ul>' + buildListHtml(n.children) + '</ul>'
            return
        }

        if (n.type === 'OrderedList') {
            html +=
                '<ol start="' +
                n.value +
                '">' +
                buildListHtml(n.children) +
                '</ol>'
            return
        }

        // if (n.type === 'ListItem') {
        //     console.log('==>', 1001, n)
        //     html += '<li>' + buildListHtml(n.children) + '</li>'

        //     return
        // }

        html += '<li>'

        // console.log('==>', 3000, n)

        n.children.forEach(_ => {
            // console.log('==>', 3001, _)

            if (_.type === 'Text') {
                html += getTextBody(_.value)
            }

            if (_.type === 'Anchor') {
                html +=
                    `<a href="${_.href}">` +
                    getTextBody(_.text ?? _.href) +
                    '</a>'
            }

            if (_.type === 'List') {
                html += '<ul>' + buildListHtml(_.children) + '</ul>'
            }

            if (_.type === 'OrderedList') {
                html +=
                    '<ol start="' +
                    _.value +
                    '">' +
                    buildListHtml(_.children) +
                    '</ol>'
            }
        })

        html += '</li>'
    })

    return html
}
