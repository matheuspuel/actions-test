import { named2 } from 'src/components/hyperscript'
import { TextProps } from 'src/components/react-native/Txt'
import { Colors } from 'src/services/Theme'
import { Txt } from '../react-native/Txt'

export const Label = named2('Label')((props?: TextProps) =>
  Txt({
    align: 'left',
    size: 12,
    color: Colors.text.normal,
    ...props,
  }),
)
