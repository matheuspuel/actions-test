import { A, E, Either, Record, Tuple, identity, pipe } from 'fp'

export type FormValue<A> = {
  value: A
  errors: Array<string>
}

export const initial = <A>(initial: A): FormValue<A> => ({
  value: initial,
  errors: [],
})

export const formFieldsDecoder =
  <
    P extends Record<
      string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v: any) => Either<Array<string>, unknown>
    >,
  >(
    properties: P,
  ) =>
  (vs: { [K in keyof P]: FormValue<Parameters<P[K]>[0]> }): Either<
    {
      [K in keyof P]: Array<string>
    },
    {
      [K in keyof P]: (ReturnType<P[K]> & E.Right<never, unknown>)['right']
    }
  > =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    pipe(
      properties,
      Record.map((p, k) => p(vs[k]?.value)),
      v =>
        pipe(v, Record.toEntries, A.map(Tuple.getSecond), A.every(E.isRight))
          ? E.right(
              pipe(
                v as Record<string, E.Right<never, unknown>>,
                Record.map(v => v.right),
              ),
            )
          : E.left(
              pipe(
                v,
                Record.map(E.match({ onLeft: identity, onRight: () => [] })),
              ),
            ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any
