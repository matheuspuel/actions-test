import { pipe } from 'fp'
import { TextStyleProvider } from 'src/contexts/TextStyle'
import { Colors } from 'src/services/Theme'
import { named2 } from '../hyperscript'
import { Pressable, PressableProps } from '../react-native/Pressable'
import { Children, UIColor, UIElement } from '../types'

export const SolidButton = named2('SolidButton')(
  (
    props: PressableProps & {
      color?: UIColor
      textColor?: UIColor
    },
  ) =>
    (children: Children): UIElement =>
      Pressable({
        justify: 'center',
        align: 'center',
        direction: 'row',
        gap: 4,
        p: 12,
        round: 4,
        bg:
          props.bg ??
          pipe(props.color ?? Colors.primary, c =>
            props.isEnabled === false ? Colors.opacity(0.375)(c) : c,
          ),
        rippleColor: Colors.black,
        rippleOpacity: props.isEnabled ?? true ? props.rippleOpacity : 0,
        ...props,
      })([
        TextStyleProvider({
          color: pipe(props.textColor ?? Colors.text.light, c =>
            props.isEnabled === false ? Colors.opacity(0.375)(c) : c,
          ),
          size: 14,
          weight: 7,
          case: 'uppercase',
        })(children),
      ]),
)
