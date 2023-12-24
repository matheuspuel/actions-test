export * from 'effect/Data'

type AnyTagged = { _tag: string }

export type TagType<A extends AnyTagged, T extends AnyTagged['_tag']> = Extract<
  A,
  { _tag: T }
>

export const isTag =
  <A extends AnyTagged, K extends A['_tag']>(tag: K) =>
  (v: A): v is Extract<typeof v, { _tag: K }> =>
    v._tag === tag

export const isOneOfTags =
  <A extends AnyTagged, K extends A['_tag']>(
    // eslint-disable-next-line functional/functional-parameters
    ...tags: K extends A ? Array<K> : Array<A['_tag']>
  ) =>
  (v: A): v is Extract<typeof v, { _tag: K }> => {
    const ts: Array<string> = tags
    return ts.includes(v._tag)
  }
