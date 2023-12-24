/* eslint-disable functional/no-loop-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Optional, optional } from '@fp-ts/optic'
import {
  A,
  Data,
  E,
  Effect,
  Either,
  Eq,
  Equivalence,
  LazyArg,
  O,
  Option,
  Ord,
  Record,
  S,
  Tuple,
  flow,
  pipe,
} from 'fp'
import * as Timestamp from '../datatypes/Timestamp'

export type QueryState<E, A> = Data.Case &
  Readonly<{
    isLoading: boolean
    error: Option<Data.Case & Readonly<{ time: Timestamp.Timestamp; value: E }>>
    data: Option<Data.Case & Readonly<{ time: Timestamp.Timestamp; value: A }>>
  }>

export type FromEitherType<F extends Either<unknown, unknown>> = QueryState<
  E.LeftType<F>,
  E.RightType<F>
>

export type FromEffectType<F extends Effect<unknown, unknown, unknown>> =
  QueryState<Effect.Error<F>, Effect.Success<F>>

const Schema_ = <EI, EA, AI, AA>(args: {
  error: S.Schema<EI, EA>
  data: S.Schema<AI, AA>
}) =>
  S.data(
    S.struct({
      isLoading: S.boolean,
      error: S.option(
        S.data(S.struct({ time: Timestamp.Schema, value: args.error })),
      ),
      data: S.option(
        S.data(S.struct({ time: Timestamp.Schema, value: args.data })),
      ),
    }),
  )
export const Schema: <EI, EA, AI, AA>(args: {
  error: S.Schema<EI, EA>
  data: S.Schema<AI, AA>
}) => S.Schema<
  S.Schema.From<ReturnType<typeof Schema_<EI, EA, AI, AA>>>,
  QueryState<EA, AA>
> = Schema_

const initial_: QueryState<never, never> = Data.struct({
  isLoading: false,
  error: O.none(),
  data: O.none(),
})

export const initial: <E = never, A = never>() => QueryState<E, A> = () =>
  initial_

const loading_: QueryState<never, never> = Data.struct({
  isLoading: true,
  error: O.none(),
  data: O.none(),
})

export const loading: () => QueryState<never, never> = () => loading_

export const success: (
  time: Timestamp.Timestamp,
) => <A>(value: A) => QueryState<never, A> = time => value =>
  Data.struct({
    isLoading: false,
    error: O.none(),
    data: O.some(Data.struct({ time, value })),
  })

export const failure: (
  time: Timestamp.Timestamp,
) => <E>(error: E) => QueryState<E, never> = time => error =>
  Data.struct({
    isLoading: false,
    error: O.some(Data.struct({ time, value: error })),
    data: O.none(),
  })

export const isFetching: (
  queryState: QueryState<unknown, unknown>,
) => boolean = s => s.isLoading

export const map =
  <E, A, B>(f: (data: A) => B) =>
  (queryState: QueryState<E, A>): QueryState<E, B> =>
    Data.struct({
      ...queryState,
      data: pipe(
        queryState.data,
        O.map(v => Data.struct({ ...v, value: f(v.value) })),
      ),
    })

export const matchW =
  <E, A, CL, CF, CS>(
    caseInitialOrLoading: LazyArg<CL>,
    caseFailure: (error: E) => CF,
    caseSuccess: (data: A) => CS,
  ) =>
  (queryState: QueryState<E, A>): CL | CF | CS =>
    pipe(
      queryState.data,
      O.match({
        onNone: () =>
          pipe(
            queryState.error,
            O.match({
              onNone: () => caseInitialOrLoading(),
              onSome: e => caseFailure(e.value),
            }),
          ),
        onSome: d => caseSuccess(d.value),
      }),
    )

export const match: <E, A, B>(
  caseInitialOrLoading: LazyArg<B>,
  caseFailure: (error: E) => B,
  caseSuccess: (data: A) => B,
) => (queryState: QueryState<E, A>) => B = matchW

export const matchWithInitialW =
  <E, A, CI, CL, CF, CS>(cases: {
    initial: LazyArg<CI>
    loading: LazyArg<CL>
    failure: (error: E) => CF
    success: (data: A) => CS
  }) =>
  (queryState: QueryState<E, A>): CI | CL | CF | CS =>
    pipe(
      queryState,
      matchW(
        () => (queryState.isLoading ? cases.loading() : cases.initial()),
        cases.failure,
        cases.success,
      ),
    )

export const matchWithInitial: <E, A, B>(cases: {
  initial: LazyArg<B>
  loading: LazyArg<B>
  failure: (error: E) => B
  success: (data: A) => B
}) => (queryState: QueryState<E, A>) => B = matchWithInitialW

export const all: <
  const I extends
    | Iterable<QueryState<any, any>>
    | Record<string, QueryState<any, any>>,
>(
  input: I,
) => [I] extends [ReadonlyArray<QueryState<any, any>>]
  ? QueryState<
      I[number] extends never
        ? never
        : [I[number]] extends [QueryState<infer E, any>]
          ? E
          : never,
      {
        -readonly [K in keyof I]: [I[K]] extends [QueryState<any, infer A>]
          ? A
          : never
      }
    >
  : [I] extends [Iterable<QueryState<infer E, infer A>>]
    ? QueryState<E, Array<A>>
    : QueryState<
        I[keyof I] extends never
          ? never
          : [I[keyof I]] extends [QueryState<infer E, any>]
            ? E
            : never,
        {
          -readonly [K in keyof I]: [I[K]] extends [QueryState<any, infer A>]
            ? A
            : never
        }
      > = (
  input: Iterable<QueryState<any, any>> | Record<string, QueryState<any, any>>,
): any => {
  if (Symbol.iterator in input) {
    return Data.struct({
      isLoading: A.some(A.fromIterable(input), v => v.isLoading),
      error: pipe(
        input,
        A.fromIterable,
        A.map(_ => _.error),
        A.getSomes,
        A.nonEmptyOption,
        O.map(A.min(Ord.mapInput(Timestamp.Order, v => v.time))),
      ),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: (() => {
        // eslint-disable-next-line functional/no-let
        let time: Timestamp.Timestamp | null = null
        const out: Array<QueryState<any, any>> = []
        for (const i of input) {
          const v = i.data
          if (O.isNone(v)) {
            return O.none()
          }
          // eslint-disable-next-line functional/no-expression-statements, functional/immutable-data, @typescript-eslint/no-unsafe-argument
          out.push(v.value.value)
          // eslint-disable-next-line functional/no-expression-statements
          time =
            time === null
              ? v.value.time
              : Ord.min(Timestamp.Order)(time, v.value.time)
        }
        return time === null
          ? O.none()
          : O.some(Data.struct({ time: time, value: out }))
      })(),
    })
  }
  return Data.struct({
    isLoading: Record.some(input, v => v.isLoading),
    error: pipe(
      input,
      Record.toEntries,
      A.map(Tuple.getSecond),
      A.map(_ => _.error),
      A.getSomes,
      A.nonEmptyOption,
      O.map(A.min(Ord.mapInput(Timestamp.Order, v => v.time))),
    ),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: (() => {
      // eslint-disable-next-line functional/no-let
      let time: Timestamp.Timestamp | null = null
      const out: Record<string, any> = {}
      for (const key of Object.keys(input)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const v = input[key]!.data
        if (O.isNone(v)) {
          return O.none()
        }
        // eslint-disable-next-line functional/no-expression-statements, functional/immutable-data, @typescript-eslint/no-unsafe-assignment
        out[key] = v.value.value
        // eslint-disable-next-line functional/no-expression-statements
        time =
          time === null
            ? v.value.time
            : Ord.min(Timestamp.Order)(time, v.value.time)
      }
      return time === null
        ? O.none()
        : O.some(Data.struct({ time: time, value: out }))
    })(),
  })
}

export const toOption: <E, A>(data: QueryState<E, A>) => Option<A> = match(
  () => O.none(),
  () => O.none(),
  O.some,
)

export const valueOptic = <E, A>(): Optional<QueryState<E, A>, A> =>
  optional<QueryState<E, A>, A>(
    flow(
      toOption,
      O.match({
        onNone: () => E.left(new Error('Expected QueryStateValue')),
        onSome: E.right,
      }),
    ),
    a => s =>
      pipe(
        toOption(s),
        O.match({
          onNone: () => E.left(new Error('Expected QueryStateValue')),
          onSome: () =>
            pipe(
              s,
              map(() => a),
              E.right,
            ),
        }),
      ),
  )

export const startLoading: <E, A>(
  state: QueryState<E, A>,
) => QueryState<E, A> = state => ({ ...state, isLoading: true })

export const receiveSuccess: (
  time: Timestamp.Timestamp,
) => <A>(data: A) => <E>(state: QueryState<E, A>) => QueryState<E, A> =
  time => data => _state =>
    Data.struct({
      isLoading: false,
      error: O.none(),
      data: O.some(Data.struct({ time, value: data })),
    })

export const receiveFailure: (
  time: Timestamp.Timestamp,
) => <E>(error: E) => <A>(state: QueryState<E, A>) => QueryState<E, A> =
  time => error => state =>
    Data.struct({
      isLoading: false,
      error: O.some(Data.struct({ time, value: error })),
      data: state.data,
    })

export const receiveResult =
  (time: Timestamp.Timestamp) =>
  <E, E1 extends E, A>(result: Either<E1, A>) =>
  (state: QueryState<E, A>): QueryState<E, A> =>
    pipe(
      result,
      E.match({
        onLeft: e => receiveFailure(time)<E>(e)(state),
        onRight: a => receiveSuccess(time)(a)(state),
      }),
    )

export const invalidate: <E, A>(
  state: QueryState<E, A>,
) => QueryState<E, A> = s =>
  Data.struct({
    data: O.none(),
    error: s.error,
    isLoading: s.isLoading,
  })

export const getEquivalence = <E, A>(
  errorEq: Equivalence<E>,
  dataEq: Equivalence<A>,
): Equivalence<QueryState<E, A>> =>
  Eq.struct({
    isLoading: Eq.boolean,
    error: O.getEquivalence(Eq.struct({ time: Eq.number, value: errorEq })),
    data: O.getEquivalence(Eq.struct({ time: Eq.number, value: dataEq })),
  })
