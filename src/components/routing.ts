import { A } from 'fp'
import { Fragment } from 'src/components'
import { UIElementInput } from 'src/components/types'

export const screen =
  <A>(f: (args: A) => UIElementInput) =>
  (args: A) => ({ _tag: 'Screen' as const, screen: f(args) })

export const modal =
  <A>(f: (args: A) => UIElementInput) =>
  (args: A) => ({ _tag: 'Modal' as const, modal: f(args) })

export const mergeModalsToScreens = A.reduce(
  [],
  (
    acc: Array<UIElementInput>,
    v:
      | { _tag: 'Screen'; screen: UIElementInput }
      | { _tag: 'Modal'; modal: UIElementInput },
  ) =>
    v._tag === 'Screen'
      ? [...acc, v.screen]
      : A.matchRight(acc, {
          onEmpty: () => [v.modal],
          onNonEmpty: (init, last) => [...init, Fragment([last, v.modal])],
        }),
)
