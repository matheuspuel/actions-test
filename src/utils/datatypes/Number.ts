import { S } from 'fp'

export type Int = S.Schema.To<typeof Int>
export const Int = S.JsonNumber.pipe(S.int(), S.brand('Int'))

export type Positive = S.Schema.To<typeof Positive>
export const Positive = S.JsonNumber.pipe(S.positive(), S.brand('Positive'))

export type PositiveInt = Int & Positive
export const PositiveInt = S.JsonNumber.pipe(
  S.positive(),
  S.brand('Positive'),
  S.int(),
  S.brand('Int'),
)

export type PositiveOrZero = S.Schema.To<typeof PositiveOrZero>
export const PositiveOrZero = S.union(Positive, S.literal(0))

export type PositiveIntOrZero = S.Schema.To<typeof PositiveIntOrZero>
export const PositiveIntOrZero = S.union(PositiveInt, S.literal(0))
