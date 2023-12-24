import tokenize from './tokenize'
import parse from './parse'
import traverse from './traverse'
import generate from './generate'
import { pipe } from './utils'

export const parseAndGenerate = pipe(tokenize, parse, traverse, generate)
