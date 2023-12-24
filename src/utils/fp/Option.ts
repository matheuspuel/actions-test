export * from 'effect/Option'
import { Equivalence } from 'effect/Equivalence'
import { Option, Some, getEquivalence, isSome } from 'effect/Option'
import * as Eq from './Equivalence'

export type SomeType<A extends Option<unknown>> = A extends Some<infer B>
  ? B
  : never

export const getEquivalenceSome = <A>(
  E: Equivalence<A>,
): Equivalence<Option<A>> =>
  Eq.make((x, y) => isSome(x) && getEquivalence(E)(x, y))
