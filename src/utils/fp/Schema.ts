import * as PR from '@effect/schema/ParseResult'
import * as S from '@effect/schema/Schema'
import { Schema } from '@effect/schema/Schema'
import * as E from 'effect/Either'
import { Either } from 'effect/Either'
import { dual } from 'effect/Function'

export * from '@effect/schema/Schema'

export const compose: {
  <C, D>(cd: Schema<C, D>): <A>(ab: Schema<A, C>) => Schema<A, D>
  <C, D>(
    cd: Schema<C, D>,
    options: { strict: false },
  ): <A, B>(ab: Schema<A, B>) => Schema<A, D>
  <A, C, D>(ab: Schema<A, C>, cd: Schema<C, D>): Schema<A, D>
  <A, B, C, D>(
    ab: Schema<A, B>,
    cd: Schema<C, D>,
    options: { strict: false },
  ): Schema<A, D>
} = dual(
  args => S.isSchema(args[1]),
  <A, B, C, D>(ab: Schema<A, B>, cd: Schema<C, D>): Schema<A, D> =>
    S.compose(ab, cd),
)

export const eitherFromUnion = <EI, EA, AI, AA>(schemas: {
  left: Schema<EI, EA>
  right: Schema<AI, AA>
}): Schema<EI | AI, Either<EA, AA>> => {
  const eitherSchema = S.to(S.either(schemas.left, schemas.right))
  return S.union(
    S.transformOrFail(
      schemas.left,
      eitherSchema,
      _ => PR.succeed(E.left(_)),
      v =>
        E.match(v, {
          onLeft: PR.succeed,
          onRight: () => PR.fail(PR.type(eitherSchema.ast, v)),
        }),
    ),
    S.transformOrFail(
      schemas.right,
      eitherSchema,
      _ => PR.succeed(E.right(_)),
      v =>
        E.match(v, {
          onLeft: () => PR.fail(PR.type(eitherSchema.ast, v)),
          onRight: PR.succeed,
        }),
    ),
  )
}

export const fromNumberString = <I extends number, A>(
  schema: Schema<I, A>,
): Schema<string, A> => S.compose(S.NumberFromString, schema)
