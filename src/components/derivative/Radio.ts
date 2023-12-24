import { A, O, Option, pipe } from 'fp'
import { View } from 'src/components'
import { AppEvent } from 'src/modules/core/events'
import { RadioItem } from './RadioItem'

export const Radio =
  <A extends string | number | boolean>({
    value,
    onChange,
  }: {
    value: Option<A>
    onChange: (value: A) => AppEvent
  }) =>
  (options: ReadonlyArray<{ label: string; value: A }>) =>
    View({ direction: 'row', wrap: 'wrap' })(
      pipe(
        options,
        A.map(o =>
          RadioItem({
            label: o.label,
            isActive: pipe(
              value,
              O.match({ onNone: () => false, onSome: s => s === o.value }),
            ),
            onSelect: onChange(o.value),
          }),
        ),
      ),
    )
