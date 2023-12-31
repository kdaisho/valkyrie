import { List, ListItem, OrderedList, Node } from '../types'

export default function traverse(ast: Node[]) {
    const output: Node[] = []
    const liStack: (List | OrderedList)[] = []
    const liItemStack: (List | OrderedList | ListItem)[] = []
    // const olStack: OrderedList[] = []
    const stack: Node[] = []

    ast.forEach(node => {
        console.log('===================>', 0, node)

        if (node.type === 'List') {
            let _node = node as List | null

            if (_node === null) return

            console.log('==>', 301, liStack)
            console.log('==>', 3019, _node)
            console.log('==>', 7110, JSON.stringify(output, null, 2))

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                console.log('==>', '======================== wwwwa')
                liStack.pop()
            }

            // while (liItemStack[liItemStack.length - 1]?.depth > _node.depth) {
            //     console.log(
            //         '==>',
            //         '======================== wwwwwwwwwww liItem'
            //     )
            //     liItemStack.pop()
            // }

            console.log('==>', 302, JSON.stringify(stack, null, 2))

            if (
                stack[stack.length - 1]?.type === 'List' ||
                stack[stack.length - 1]?.type === 'OrderedList'
            ) {
                const parent = liStack[liStack.length - 1]
                console.log('==>', 700, parent)

                if (parent.depth === _node.depth) {
                    // parent.children.push(..._node.children)
                    console.log('==>', 701, _node)

                    // parent.type === 'List'
                    //     ? parent.children.push(..._node.children)
                    //     : //   parent.children.push(_node.children[0])
                    //       //   parent.children.push(_node)
                    //       //   output.push(_node)
                    //       liStack.push(_node)

                    if (parent.type === 'List') {
                        parent.children.push(..._node.children)
                    } else {
                        console.log('==>', 'hun', _node)
                        console.log('==> li', liStack)
                        console.log('==> liItem', liItemStack)

                        // either this
                        // liStack.push(_node)
                        // or this
                        // parent.children.push(..._node.children)

                        if (
                            liItemStack[liItemStack.length - 1].type ===
                                'List' ||
                            (liItemStack[liItemStack.length - 1].type ===
                                'OrderedList' &&
                                (
                                    liItemStack[liItemStack.length - 1] as
                                        | List
                                        | OrderedList
                                ).depth > _node.depth)
                        ) {
                            liStack.push(_node)
                            console.log(
                                '==>',
                                '======================== wwwwwwwwwww liItem'
                            )
                            output.push(_node)
                        } else {
                            parent.children.push(..._node.children)
                        }
                    }

                    // conditionally
                    // output.push(_node)

                    console.log('==>', 710, parent)
                    console.log('==>', 7109, liStack)

                    console.log('==>', 711, JSON.stringify(output, null, 2))
                    _node = null
                } else {
                    console.log('==>', 702, _node)
                    console.log('==>', 7033, liStack)
                    console.log('==>', 703, liItemStack)
                    // console.log('==>', 600, liItemStack)

                    // liItemStack[liItemStack.length - 1].children.push(_node)

                    liStack[liStack.length - 1].children.push(_node)

                    console.log('==>', 704, liStack)
                    // console.log('==>', 601, liItemStack)

                    // console.log('==>', 700, parent)
                    // parent.children.push(_node)
                    // console.log('==>', 701, parent)
                }
            } else {
                console.log('==>', 800, _node)
                // NO NEED THIS????
                output.push(_node)
            }

            if (_node) {
                console.log('==>', 10000, _node)
                console.log('==>', 10001, liItemStack)
                console.log('==>', 10002, liStack)
                liItemStack.push(..._node.children)
                liStack.push(_node)
            }
        } else if (node.type === 'OrderedList') {
            let _node = node as OrderedList | null
            if (_node === null) return
            console.log('==>', -3060000000000)

            console.log('==>', -302, JSON.stringify(stack, null, 2))
            console.log('==>', -303, liStack)

            while (liStack[liStack.length - 1]?.depth > _node.depth) {
                liStack.pop()
            }

            // console.log('==>', 10, stack)

            if (
                stack[stack.length - 1]?.type === 'OrderedList' ||
                stack[stack.length - 1]?.type === 'List'
            ) {
                console.log('==>', -304, liStack)
                const parent = liStack[liStack.length - 1]
                console.log('==>', -305, parent)
                // console.log('==>', 401, liItemStack)
                if (parent.depth === _node.depth) {
                    console.log('==>', -306, _node)

                    // console.log('==>', 11, parent)
                    // parent.children.push(..._node.children)

                    // parent.type === 'OrderedList'
                    //     ? parent.children.push(..._node.children)
                    //     : output.push(_node)

                    // parent.children.push(_node)
                    // liStack.push(_node)
                    console.log('==>', -304000, liStack)
                    console.log('==>', -304001, liItemStack)

                    // liStack[0].children.push(_node)
                    // liItemStack[0].children.push(_node)

                    // liItemStack[liItemStack.length - 1].children.push(_node)
                    // liStack[liStack.length - 1].children.push(_node)
                    liStack[liStack.length - 1].children.push(..._node.children)

                    // liStack.push(_node)

                    // liItemStack.push(_node)

                    // console.log('==>', -3040, JSON.stringify(liStack, null, 2))
                    console.log('==>', -3040, liStack)
                    // console.log(
                    //     '==>',
                    //     -3041,
                    //     JSON.stringify(liItemStack, null, 2)
                    // )

                    // console.log('==>', 1001, parent)
                    // console.log('==>', 1002, JSON.stringify(output, null, 2))

                    // parent.children.push(_node)
                    // _node = null
                    console.log('==>', -3091, JSON.stringify(output, null, 2))
                } else {
                    console.log('==>', -307, parent)
                    console.log('==>', -308, _node)
                    // console.log('==>', 500, liItemStack)
                    // liItemStack.push(..._node.children)
                    liStack[liStack.length - 1].children.push(_node)
                    // liItemStack[liItemStack.length - 1].children.push(_node)
                    console.log('==>', -30700, liStack)
                    console.log('==>', -30701, liItemStack)

                    // parent.children.push(_node)
                    // console.log('==>', 501, liItemStack)

                    // _node = null

                    console.log('==>', -309, JSON.stringify(output, null, 2))
                    // console.log('==>', 101, parent)
                }
            } else {
                // console.log('==>', 900, _node)
                output.push(_node)
            }

            if (_node) {
                // olStack.push(_node)
                // liItemStack.push(..._node.children)
                liItemStack.push(_node)
                liStack.push(_node)
                // console.log('==>', 102, liItemStack, _node.children)
                // console.log('==>', 103, { liStack, _node })
            }
        } else {
            output.push(node)
        }

        stack.push(node)
    })

    console.log('==> traverse', JSON.stringify(output, null, 2))

    return output
}
