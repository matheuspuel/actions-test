import { Colors } from 'src/services/Theme'
import { Txt } from '../react-native/Txt'
import { View } from '../react-native/View'

export const EmptyPlaceholder = (text: string) =>
  View({ flex: 1, justify: 'center' })([
    Txt({ align: 'center', color: Colors.text.gray })(text),
  ])
