import { pipe, S } from 'fp'
import { PositiveInt } from './Number'

export const Id = pipe(S.string, S.brand('Id'))

export type Id = S.Schema.To<typeof Id>

export const getId: <A extends { id: unknown }>(a: A) => A['id'] = a => a.id

export type Code = PositiveInt

export const Code: S.Schema<number, Code> = PositiveInt

export const getCode: <A extends { code: unknown }>(a: A) => A['code'] = a =>
  a.code

export const getTimestamp: <A extends { timestamp: number }>(
  a: A,
) => number = a => a.timestamp
