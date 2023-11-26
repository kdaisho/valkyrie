import tokenize from './tokenize'
import parse from './parse'
import generate from './generate'
import { pipe } from './utils'

export const parseAndGenerate = pipe(tokenize, parse, generate)
