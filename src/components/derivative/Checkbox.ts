import { named } from 'src/components/hyperscript'
import { MaterialIcons } from 'src/components/icons/MaterialIcons'
import { Pressable } from 'src/components/react-native/Pressable'
import { Txt } from 'src/components/react-native/Txt'
import { View } from 'src/components/react-native/View'
import { AppEvent } from 'src/modules/core/events'
import { Colors } from 'src/services/Theme'

export const Checkbox = named('Checkbox')(
  (props: {
    onPress: AppEvent
    active: boolean
    label: string
    flex?: number
    text?: { flex?: number }
  }) =>
    Pressable({
      onPress: props.onPress,
      direction: 'row',
      align: 'center',
      p: 8,
      gap: 8,
      round: 8,
      flex: props.flex,
    })([
      props.active
        ? View({
            borderWidth: 2,
            round: 4,
            h: 28,
            w: 28,
            bg: Colors.primary,
            borderColor: Colors.primary,
          })([
            MaterialIcons({
              name: 'check',
              size: 24,
              color: Colors.text.light,
            }),
          ])
        : View({
            borderWidth: 2,
            round: 4,
            borderColor: Colors.toneStatic(-0.5)(Colors.black),
            h: 28,
            w: 28,
          })([]),
      Txt({ size: 12, weight: 7, flex: props.text?.flex })(props.label),
    ]),
)
