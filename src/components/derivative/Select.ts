import { PressableProps } from 'src/components/react-native/Pressable'
import { TextProps } from 'src/components/react-native/Txt'
import { Colors } from 'src/services/Theme'
import { MaterialIcons } from '../icons/MaterialIcons'
import { Pressable } from '../react-native/Pressable'
import { Txt } from '../react-native/Txt'
import { View } from '../react-native/View'

export type SelectProps = PressableProps & {
  round?: number
  text: string
  _text?: TextProps
}

export const Select = ({
  text,
  _text,
  round,
  ...pressableProps
}: SelectProps) =>
  View({
    borderWidth: 1,
    borderColor: Colors.toneStatic(-0.67)(Colors.black),
    round: round ?? 4,
    overflow: 'hidden',
  })([
    Pressable({
      direction: 'row',
      align: 'center',
      gap: 8,
      p: 8,
      px: 12,
      ...pressableProps,
    })([
      Txt({
        numberOfLines: 1,
        flex: 1,
        lineHeight: 24,
        ..._text,
      })(text),
      MaterialIcons({
        name: 'arrow-drop-down',
        size: 24,
        color: Colors.toneStatic(0.15)(Colors.black),
      }),
    ]),
  ])
