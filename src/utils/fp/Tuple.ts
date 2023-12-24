export * from 'effect/Tuple'

export const make_ = <A, B>(first: A, second: B): [A, B] => [first, second]

export const make =
  <B>(second: B) =>
  <A>(first: A): [A, B] => [first, second]
