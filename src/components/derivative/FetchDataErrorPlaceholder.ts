import { Colors } from 'src/services/Theme'
import { MaterialIcons } from '../icons/MaterialIcons'
import { Txt } from '../react-native/Txt'
import { View } from '../react-native/View'

export const FetchDataErrorPlaceholder = View({
  flex: 1,
  p: 24,
  justify: 'center',
  align: 'center',
})([
  View({ m: 16 })([
    MaterialIcons({ name: 'wifi-off', size: 60, color: Colors.gray }),
  ]),
  Txt({ p: 8, align: 'center', color: Colors.text.gray })(
    'Não foi possível buscar os dados.',
  ),
  Txt({ p: 8, align: 'center', color: Colors.text.gray })(
    'Verifique a conexão com a internet e tente novamente.',
  ),
])
