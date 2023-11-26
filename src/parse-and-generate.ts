import tokenize from './tokenize'
import parse from './parse'
import { pipe } from './utils'

export const parseAndGenerate = pipe(tokenize, parse)
