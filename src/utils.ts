/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe =
    (...fns: Array<(v: any) => any>) =>
    (value: any) =>
        fns.reduce((acc, fn) => fn(acc), value)

export const peek = (arr: string[]) => arr[1]
export const pop = (arr: string[]) => arr.shift()
