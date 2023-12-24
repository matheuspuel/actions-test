import { dual, pipe } from 'effect/Function'
import * as O from 'effect/Option'
import { Option } from 'effect/Option'
import * as Ord from 'effect/Order'
import { Order } from 'effect/Order'
import * as A from 'effect/ReadonlyArray'
import { NonEmptyReadonlyArray } from 'effect/ReadonlyArray'
import * as Eq from './Equivalence'

export * from 'effect/ReadonlyArray'

export const isArray = <A>(a: A): a is Extract<A, ReadonlyArray<unknown>> =>
  Array.isArray(a)

export const nonEmptyOption = <A>(
  as: ReadonlyArray<A>,
): Option<A.NonEmptyReadonlyArray<A>> =>
  A.match(as, { onEmpty: O.none, onNonEmpty: O.some })

export const minIndex: {
  <A>(order: Order<A>): (self: NonEmptyReadonlyArray<A>) => number
  <A>(self: NonEmptyReadonlyArray<A>, order: Order<A>): number
} = dual(
  2,
  <A>([head, ...tail]: NonEmptyReadonlyArray<A>, order: Order<A>): number =>
    A.reduce<A, readonly [A, number]>(tail, [head, 0], (acc, b, i) =>
      Ord.lessThanOrEqualTo(order)(acc[0], b) ? acc : [b, i + 1],
    )[1],
)

export const getUnorderedEq = <A>(
  E: Eq.Equivalence<A>,
): Eq.Equivalence<Array<A>> =>
  Eq.make((as, bs) =>
    pipe(
      as,
      A.matchLeft({
        onEmpty: () => A.isEmptyArray(bs),
        onNonEmpty: (a, as_) =>
          pipe(
            A.findFirstIndex(Eq.equals(E)(a))(bs),
            O.map(i => A.remove(i)(bs)),
            O.match({
              onNone: () => false,
              onSome: Eq.equals(getUnorderedEq(E))(as_),
            }),
          ),
      }),
    ),
  )

export const findFirstMap: {
  <A, B>(f: (a: A, i: number) => Option<B>): (self: Iterable<A>) => Option<B>
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): Option<B>
} = dual(
  2,
  <A, B>(self: Iterable<A>, f: (a: A, i: number) => Option<B>): Option<B> => {
    const as = A.fromIterable(self)
    // eslint-disable-next-line functional/no-loop-statements
    for (let i = 0; i < as.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const o = f(as[i]!, i)
      if (O.isSome(o)) {
        return o
      }
    }
    return O.none()
  },
)
