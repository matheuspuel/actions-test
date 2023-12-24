export * from 'effect/Either'
import { Either, Left, Right } from 'effect/Either'

export type LeftType<A extends Either<unknown, unknown>> = A extends Left<
  infer E,
  unknown
>
  ? E
  : never

export type RightType<A extends Either<unknown, unknown>> = A extends Right<
  unknown,
  infer B
>
  ? B
  : never
