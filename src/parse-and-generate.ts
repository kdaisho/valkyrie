import { tokenize } from './tokenize'
import { pipe } from './utils'

export const parseAndGenerate = pipe(tokenize)
