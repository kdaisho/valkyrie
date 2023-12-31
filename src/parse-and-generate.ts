import tokenize from './tokenize'
import parse from './parse'
import traverse from './traverse'
import generate from './generate'
import { pipe } from './utils'

export default pipe(tokenize, parse, traverse, generate)
