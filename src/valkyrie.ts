import chalk from 'chalk'
import { parseAndGenerate } from './parse-and-generate'

const [command, ...args] = process.argv.slice(2)

if (command === 'run') {
    const file = Bun.file(args[0])
    const text = await file.text()

    const html = parseAndGenerate(text)

    console.log(chalk.yellow(html))

    Bun.write('html/index.html', html)
}
