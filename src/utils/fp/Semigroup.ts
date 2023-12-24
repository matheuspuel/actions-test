export * from '@effect/typeclass/Semigroup'
import * as SG from '@effect/typeclass/Semigroup'
import { NonEmptyReadonlyArray } from 'effect/ReadonlyArray'

export const combineAllNonEmpty =
  <A>(semigroup: SG.Semigroup<A>): ((items: NonEmptyReadonlyArray<A>) => A) =>
  ([a, ...as]) =>
    semigroup.combineMany(a, as)
