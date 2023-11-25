/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe =
    (...fns: Array<(v: any) => any>) =>
    (value: any) =>
        fns.reduce((acc, fn) => fn(acc), value)
