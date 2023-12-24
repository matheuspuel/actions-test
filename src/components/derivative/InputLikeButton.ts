import { MaterialIcons, Pressable, Txt, View } from 'src/components'
import { AppEvent } from 'src/modules/core/events'
import { Colors } from 'src/services/Theme'
import { UIColor } from '../types'

export const InputLikeButton = ({
  onPress,
  text,
  state,
  textColor,
}: {
  onPress: AppEvent
  text: string
  state?: 'normal' | 'error' | 'muted'
  textColor?: UIColor
}) =>
  Pressable({ onPress, flex: 1, round: 4 })([
    View({
      direction: 'row',
      align: 'center',
      p: 12,
      borderWidth: 1,
      borderColor: Colors.toneStatic(-0.67)(Colors.black),
      round: 4,
    })([
      Txt({
        flex: 1,
        numberOfLines: 1,
        color:
          textColor ??
          (state === 'error'
            ? Colors.error
            : state === 'muted'
              ? Colors.toneStatic(-0.5)(Colors.black)
              : Colors.text.normal),
        size: 12,
      })(text),
      MaterialIcons({
        name: 'keyboard-arrow-down',
        size: 24,
        color: Colors.gray,
      }),
    ]),
  ])
