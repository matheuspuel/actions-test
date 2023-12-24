/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Effect } from 'effect'

export const serviceFunctionsF = <I, S>(
  service: Effect.Effect<I, never, S>,
): {
  [k in {
    [k in keyof S]: S[k] extends (
      ...args: Array<any>
    ) => Effect.Effect<any, any, any>
      ? k
      : never
  }[keyof S]]: S[k] extends (
    ...args: infer Args
  ) => Effect.Effect<infer R, infer E, infer A>
    ? (...args: Args) => Effect.Effect<R | I, E, A>
    : never
} =>
  new Proxy({} as any, {
    get(_target: any, prop: any, _receiver) {
      return (...args: Array<any>) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        Effect.flatMap(service, (s: any) => s[prop](...args))
    },
  })
