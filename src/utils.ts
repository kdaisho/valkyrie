/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe =
    (...fns: Array<(v: any) => any>) =>
    (value: any) =>
        fns.reduce((acc, fn) => fn(acc), value)

let last: string | undefined

export const peek = (arr: string[]) => arr[1]

export const hindsight = () => last

export const pop = (arr: string[]) => {
    last = arr.shift()
}
