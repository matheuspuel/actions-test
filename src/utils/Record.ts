import { A, Order, Record, flow } from 'fp'

export const toSortedValues: <B>(
  ord: Order<B>,
) => <A extends B>(as: Record<string, A>) => Array<A> = ord =>
  flow(
    Record.toEntries,
    A.map(([_k, i]) => i),
    A.sort(ord),
  )
