/* eslint-disable functional/no-expression-statements */

import { describe, expect, test } from 'vitest'
import { QS, Timestamp } from '.'

describe('QueryState.all', () => {
  test('struct', () => {
    const res = QS.all({
      a: QS.success(Timestamp.Schema(1))(1),
      b: QS.success(Timestamp.Schema(2))(2),
    })
    expect(res).toStrictEqual<typeof res>(
      QS.success(Timestamp.Schema(1))({ a: 1, b: 2 }),
    )
  })

  test('tuple', () => {
    const res = QS.all([
      QS.success(Timestamp.Schema(1))(1),
      QS.success(Timestamp.Schema(2))(2),
    ])
    expect(res).toStrictEqual<typeof res>(
      QS.success(Timestamp.Schema(1))([1, 2]),
    )
  })

  test('empty struct', () => {
    const res = QS.all({})
    expect(res).toStrictEqual<typeof res>(QS.initial())
  })

  test('empty tuple', () => {
    const res = QS.all([])
    expect(res).toStrictEqual<typeof res>(QS.initial())
  })
})
