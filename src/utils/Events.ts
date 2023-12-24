import { Effect } from 'fp'

type EventLeaf<R, A> = (payload: A) => Effect<R, unknown, void>

export type EventTree<R> = {
  [k: string]: EventLeaf<R, never> | EventTree<R>
}
