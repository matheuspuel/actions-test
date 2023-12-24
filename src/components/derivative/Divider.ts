import { StyleSheet } from 'react-native'
import { ViewProps } from 'src/components/react-native/View'
import { Colors } from 'src/services/Theme'
import { memoized } from '../hyperscript'
import { View } from '../react-native/View'

export const Divider = memoized('Divider')((props?: ViewProps) =>
  View({
    bg: Colors.toneStatic(-0.67)(Colors.black),
    h: StyleSheet.hairlineWidth,
    ...props,
  })([]),
)
