import { Colors } from 'src/services/Theme'
import { ActivityIndicator } from '../react-native/ActivityIndicator'
import { View } from '../react-native/View'

export const LoadingPlaceholder = View({ flex: 1, justify: 'center' })([
  ActivityIndicator({ size: 'large', color: Colors.primary }),
])

export const LoadingPlaceholder_ = View({ justify: 'center' })([
  ActivityIndicator({ size: 'large', color: Colors.primary }),
])
