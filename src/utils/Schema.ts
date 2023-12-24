import * as AST from '@effect/schema/AST'
import { Schema } from '@effect/schema/Schema'
import { A, E, O, PR, S } from 'fp'

export const MapLiterals = <
  const A extends ReadonlyArray<readonly [AST.LiteralValue, AST.LiteralValue]>,
>(
  ...pairs: A
): Schema<A[number][0], A[number][1]> => {
  const from = S.literal(...pairs.map(_ => _[0]))
  const to = S.literal(...pairs.map(_ => _[1]))
  return S.transformOrFail(
    from,
    to,
    v =>
      A.findFirst(pairs, _ => _[0] === v).pipe(
        O.map(_ => _[1]),
        E.fromOption(() => PR.parseError([PR.type(from.ast, v)])),
      ),
    v =>
      A.findFirst(pairs, _ => _[1] === v).pipe(
        O.map(_ => _[0]),
        E.fromOption(() => PR.parseError([PR.type(to.ast, v)])),
      ),
  )
}

export const BooleanFromLiterals = <
  F extends AST.LiteralValue,
  T extends AST.LiteralValue,
>(values: {
  true: T
  false: F
}) => MapLiterals([values.true, true], [values.false, false])

export const BooleanFromSN = BooleanFromLiterals({ true: 'S', false: 'N' })

export const BooleanFromTF = BooleanFromLiterals({ true: 'T', false: 'F' })

export const NonEmptyHead = <I, A>(schema: Schema<I, A>) =>
  S.transform(
    S.nonEmptyArray(schema.pipe(S.from)),
    schema,
    v => v[0],
    v => A.of(v),
  )
