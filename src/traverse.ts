import { getLeafNode } from './utils'

export default function traverse(ast: any[]) {
    const hierarchicalAst = []
    let last

    while (ast.length) {
        last = ast.shift()
        hierarchicalAst.push(last)

        console.log('==> HI_HIER', hierarchicalAst)
        console.log('==> HI_AST', ast)
        console.log('==> HI_DEPTH', hierarchicalAst.at(-1).depth < ast[0].depth)
        while (
            last.type === 'List' &&
            ast[0]?.type === 'List' &&
            last.depth < ast[0].depth
        ) {
            console.log('==> PUSHING THIS', ast[0])
            last = ast.shift()
            console.log('==> TO', hierarchicalAst.at(-1))
            const leaf = getLeafNode(hierarchicalAst.at(-1))
            console.log('==> LEAF', leaf)

            // continue
        }
    }

    console.log('HAST:', hierarchicalAst)
}
