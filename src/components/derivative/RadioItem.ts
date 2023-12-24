import { Fragment, Pressable, Txt, View } from 'src/components'
import { AppEvent } from 'src/modules/core/events'
import { Colors } from 'src/services/Theme'

export const RadioItem = (props: {
  label: string
  isActive: boolean
  onSelect: AppEvent
}) =>
  Pressable({
    onPress: props.onSelect,
    direction: 'row',
    align: 'center',
    p: 8,
    round: 8,
    gap: 8,
  })([
    View({
      w: 24,
      aspectRatio: 1,
      round: 999,
      align: 'center',
      justify: 'center',
      borderColor: Colors.toneStatic(-0.3)(Colors.black),
      borderWidth: 2,
    })([
      props.isActive
        ? View({
            h: 12,
            w: 12,
            round: 999,
            bg: Colors.toneStatic(-0.3)(Colors.black),
          })([])
        : Fragment([]),
    ]),
    Txt({})(props.label),
  ])
