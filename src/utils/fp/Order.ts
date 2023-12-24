import { Order } from 'effect/Order'

export * from 'effect/Order'
export {
  Order,
  greaterThanOrEqualTo as geq,
  greaterThan as gt,
  lessThanOrEqualTo as leq,
  lessThan as lt,
} from 'effect/Order'

export const eq =
  <A>(order: Order<A>) =>
  (a: A, b: A) =>
    order(a, b) === 0
