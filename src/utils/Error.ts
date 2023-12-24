import { ParseError, ParseErrors } from '@effect/schema/ParseResult'

export const fatal = (reason: string): never => {
  // eslint-disable-next-line functional/no-throw-statements
  throw new Error(reason)
}

export const enforceErrorInstance = (e: unknown) =>
  e instanceof Error
    ? e
    : typeof e === 'string'
      ? new Error(e)
      : new Error('Unknown type of error')

export const parseErrorActual = (e: ParseError): string =>
  parseErrorActualRec(e.errors[0])

const parseErrorActualRec = (e: ParseErrors): string => {
  switch (e._tag) {
    case 'Type':
      return formatActual(e.actual)
    case 'Forbidden':
      return e._tag
    case 'Index':
      return parseErrorActualRec(e.errors[0])
    case 'Unexpected':
      return e._tag
    case 'Key':
      return parseErrorActualRec(e.errors[0])
    case 'Missing':
      return e._tag
    case 'UnionMember':
      return parseErrorActualRec(e.errors[0])
  }
}

const formatActual = (actual: unknown): string => {
  if (
    actual === undefined ||
    actual === null ||
    typeof actual === 'number' ||
    typeof actual === 'symbol' ||
    actual instanceof Date
  ) {
    return String(actual)
  }
  if (typeof actual === 'bigint') {
    return String(actual) + 'n'
  }
  try {
    return JSON.stringify(actual)
  } catch (e) {
    return String(actual)
  }
}
