import { LazyArg, pipe } from 'effect/Function'
import * as Match_ from 'effect/Match'
import { Unify } from 'effect/Unify'

export * from 'effect/Match'

type Tags<D extends string, P> = P extends Record<D, infer X> ? X : never

export const valueSomeTags =
  <
    R,
    P extends {
      readonly [Tag in Tags<'_tag', R> & string]?:  // eslint-disable-next-line @typescript-eslint/no-explicit-any
        | ((_: Extract<R, Record<'_tag', Tag>>) => any)
        | undefined
    } & { readonly [Tag in Exclude<keyof P, Tags<'_tag', R>>]: never },
  >(
    fields: P,
  ) =>
  (value: R) =>
    pipe(value, Match_.value, Match_.tags(fields))

export const valueTagsOrElse =
  <
    A extends { _tag: string },
    C extends {
      [k in A['_tag']]?: (a: Extract<A, { _tag: k }>) => unknown
    } & { _: (a: A) => unknown },
  >(
    cases: C,
  ) =>
  (a: A): ReturnType<NonNullable<C[keyof C]>> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    (cases[a._tag as A['_tag']] ?? cases._)(a as any) as any

export const valueString =
  <
    R extends string,
    P extends {
      readonly [Tag in R & string]: LazyArg<unknown>
    } & { readonly [Tag in Exclude<keyof P, R>]: never },
  >(
    fields: P,
  ) =>
  (value: R) =>
    pipe({ _tag: value }, Match_.valueTags(fields))

export const valueNumber =
  <
    R extends number,
    P extends {
      readonly [Tag in R & string]: LazyArg<unknown>
    } & { readonly [Tag in Exclude<keyof P, R>]: never },
  >(
    fields: P,
  ) =>
  (value: R) =>
    pipe({ _tag: value }, Match_.valueTags(fields))

export const forTags = <
  const I,
  P extends {
    readonly [Tag in Tags<'_tag', I> & string]: (
      _: Extract<I, Readonly<{ _tag: Tag }>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => any
  } & { readonly [Tag in Exclude<keyof P, Tags<'_tag', I>>]: never },
>(
  input: I,
  fields: P,
): Unify<ReturnType<P[keyof P]>> => Match_.valueTags(fields)(input)

export const forDiscriminators =
  <D extends string>(field: D) =>
  <
    const I,
    P extends {
      readonly [Tag in Tags<D, I> & string]: (
        _: Extract<I, Record<D, Tag>>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => any
    } & { readonly [Tag in Exclude<keyof P, Tags<D, I>>]: never },
  >(
    input: I,
    fields: P,
  ): Unify<ReturnType<P[keyof P]>> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    pipe(
      Match_.value(input),
      Match_.discriminatorsExhaustive(field)(fields),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any

export const valueDiscriminators =
  <D extends string>(field: D) =>
  <
    const I,
    P extends {
      readonly [Tag in Tags<D, I> & string]: (
        _: Extract<I, Record<D, Tag>>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => any
    } & { readonly [Tag in Exclude<keyof P, Tags<D, I>>]: never },
  >(
    fields: P,
  ) =>
  (input: I): Unify<ReturnType<P[keyof P]>> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    pipe(
      Match_.value(input),
      Match_.discriminatorsExhaustive(field)(fields),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any
