import { parseAndGenerate } from './parse-and-generate'

const [command, ...args] = process.argv.slice(2)

if (command === 'run') {
    const file = Bun.file(args[0])
    const text = await file.text()

    console.log('==> 22', text)
    console.log('==> 223', text.length)
    // return

    console.log('VALKYRIE:', parseAndGenerate(text))
}
