import { named } from 'src/components/hyperscript'
import { Colors } from 'src/services/Theme'
import { MaterialIcons } from '../icons/MaterialIcons'
import { Txt } from '../react-native/Txt'
import { View } from '../react-native/View'

export const FormError = named('FormError')((message: string) =>
  View({ direction: 'row', align: 'center', gap: 4 })([
    MaterialIcons({ name: 'error-outline', size: 16, color: Colors.error }),
    Txt({ flex: 1, align: 'left', size: 12, color: Colors.error })(message),
  ]),
)
